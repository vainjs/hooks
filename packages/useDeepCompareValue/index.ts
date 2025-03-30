import { isEqual } from '@vainjs/ore'
import { useRef } from 'react'

export function useDeepCompareValue<T>(value: T) {
  const valueRef = useRef<T>(value)

  if (!isEqual(value, valueRef.current)) {
    valueRef.current = value
  }

  return valueRef.current
}
