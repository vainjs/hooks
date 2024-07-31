import { useEffect, useState } from 'react'
import type { ThrottleOptions } from '../utils/throttle'
import { useThrottleFn } from '../useThrottleFn'

export function useThrottle<T>(value: T, options?: ThrottleOptions) {
  const [throttledValue, setThrottledValue] = useState(value)

  const throttleFn = useThrottleFn((v) => {
    setThrottledValue(v as T)
  }, options)

  useEffect(() => {
    throttleFn(value)
  }, [throttleFn, value])

  return throttledValue
}
