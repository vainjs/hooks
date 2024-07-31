import { useState, useCallback } from 'react'
import { getType, isFunction, isNil, snakeCase } from './index'
import { useMemoize } from '../useMemoize'

export interface Serializer<T> {
  get(raw: string): T
  set(value: T): string
}

export interface Options<T> {
  serializer?: Serializer<T>
  prefix?: string
  onError?: (error: unknown) => void
}

export type StateUpdater<T> = (previousState?: T) => T

type SerializerType =
  | 'boolean'
  | 'object'
  | 'number'
  | 'string'
  | 'map'
  | 'set'
  | 'date'

const defaultError = (e: unknown) => console.error(e)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    const initValue = useMemoize(isFunction(value) ? value() : value)
    const type = getType(initValue)
    const serializer = options.serializer ?? serializers[type]
    const onError = options.onError ?? defaultError
    const realKey = useMemoize(
      snakeCase(`${options.prefix ?? 'vainjs_'}${key}`)
    )

    const getValue = useCallback(() => {
      try {
        const raw = storage.getItem(realKey)
        if (raw) return serializer.get(raw)
      } catch (e) {
        onError(e)
      }
      return initValue
    }, [onError, serializer, initValue, realKey])

    const [state, setState] = useState<T>(() => getValue())

    const updateValue = useMemoize((val: T | StateUpdater<T>) => {
      const newVal = isFunction(val) ? val(state) : val
      try {
        if (isNil(newVal)) {
          storage.removeItem(realKey)
        } else {
          const newRaw = serializer.set(newVal)
          if (storage.getItem(realKey) === newRaw) return
          storage.setItem(realKey, newRaw)
        }
        setState(newVal)
      } catch (e) {
        onError(e)
      }
    })

    return [state, updateValue] as const
  }
