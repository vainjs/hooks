import { useRef, useState, useCallback } from 'react'

export interface Options<T> {
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
  onError?: (error: unknown) => void
}

const defaultError = (e: unknown) => console.error(e)

export const createStorage =
  (storage: Storage) =>
  <T>(key: string, value?: T, options: Options<T> = {}) => {
    const { onError = defaultError } = useRef(options).current

    const getValue = useCallback(() => {
      try {
        storage.getItem(key)
      } catch (e) {
        onError(e)
      }
    }, [key])

    const [state, setState] = useState()
  }
