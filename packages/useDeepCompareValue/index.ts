import { useRef } from 'react'
import deepEqual from '../utils/deepEqual'

export function useDeepCompareValue<T>(value: T) {
  const valueRef = useRef<T>(value)

  if (!deepEqual(value, valueRef.current)) {
    valueRef.current = value
  }

  return valueRef.current
}
