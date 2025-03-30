import { isNil } from '@vainjs/ore'
import { useRef } from 'react'

export function useMemoize<T>(value: T) {
  const valueRef = useRef<T>()

  if (isNil(valueRef.current)) {
    valueRef.current = value
  }

  return valueRef.current as T
}
