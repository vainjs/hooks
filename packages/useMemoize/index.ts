import { useRef } from 'react'
import { isNil } from '../utils'

export function useMemoize<T>(value: T) {
  const valueRef = useRef<T>()

  if (isNil(valueRef.current)) {
    valueRef.current = value
  }

  return valueRef.current as T
}
