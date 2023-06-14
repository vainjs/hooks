import { useState, useCallback } from 'react'
import useMemoize from '../useMemoize'
import { getType, isFunction } from './index'

export interface Serializer<T> {
  get(raw: string): T
  set(value: T): string
}

export interface Options<T> {
  serializer?: Serializer<T>
  onError?: (error: unknown) => void
}

type SerializerType =
  | 'boolean'
  | 'object'
  | 'number'
  | 'string'
  | 'map'
  | 'set'
  | 'date'

const defaultError = (e: unknown) => console.error(e)

export const serializers: Record<SerializerType, Serializer<any>> = {
  boolean: {
    get: (v: string) => JSON.parse(v),
    set: (v: boolean) => JSON.stringify(v),
  },
  object: {
    get: (v: string) => JSON.parse(v),
    set: (v: object | Array<unknown>) => JSON.stringify(v),
  },
  number: {
    get: (v: string) => Number.parseFloat(v),
    set: (v: number) => String(v),
  },
  string: {
    get: (v: string) => v,
    set: (v: string) => v,
  },
  map: {
    get: (v: string) => new Map(JSON.parse(v)),
    set: (v: Map<unknown, unknown>) => JSON.stringify(Array.from(v.entries())),
  },
  set: {
    get: (v: string) => new Set(JSON.parse(v)),
    set: (v: Set<unknown>) => JSON.stringify(Array.from(v)),
  },
  date: {
    get: (v: string) => new Date(v),
    set: (v: Date) => v.toISOString(),
  },
}

export const createStorage =
  (storage: Storage) =>
  <T>(key: string, value?: T | (() => T), options: Options<T> = {}) => {
    const initValue = isFunction(value) ? value() : value
    const type = getType(initValue)
    const serializer = options.serializer ?? serializers[type]
    const onError = options.onError ?? defaultError

    const getValue = useCallback(() => {
      try {
        const raw = storage.getItem(key)
        if (raw) return serializer.get(raw)
      } catch (e) {
        onError(e)
      }
      return initValue
    }, [onError, serializer, initValue, key])

    const [state, setState] = useState<T>(() => getValue())

    const updateValue = useCallback(
      (val: T) => {
        try {
          const newRaw = serializer.set(val ?? initValue)
          if (storage.getItem(key) === newRaw) return
          storage.setItem(key, newRaw)
          setState(val)
        } catch (e) {
          onError(e)
        }
      },
      [onError, serializer, initValue, key]
    )

    return [state, updateValue]
  }
