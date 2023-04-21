import { useRef } from 'react'
import deepEqual from '../utils/deepEqual'

function useDeepCompareMemoize<T>(value: T) {
  const valueRef = useRef<T>()

  if (!deepEqual(value, valueRef.current)) {
    valueRef.current = value
  }

  return valueRef.current
}

export default useDeepCompareMemoize
