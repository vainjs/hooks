import { useRef } from 'react'
import deepEqual from '../utils/deepEqual'

function useDeepCompareRef<T>(value: T) {
  const valueRef = useRef<T>()

  if (!deepEqual(value, valueRef.current)) {
    valueRef.current = value
  }

  return valueRef.current
}

export default useDeepCompareRef
