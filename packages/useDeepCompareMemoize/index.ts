import { useRef } from 'react'
function useDeepCompareMemoize<T>(value: T) {
  const valueRef = useRef(value)
  return valueRef.current
}

export default useDeepCompareMemoize
