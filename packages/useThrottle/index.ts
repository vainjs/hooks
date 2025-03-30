import type { ThrottleOptions } from '@vainjs/ore'
import { useEffect, useState } from 'react'
import { useThrottleFn } from '../useThrottleFn'

export function useThrottle<T>(value: T, wait = 0, options?: ThrottleOptions) {
  const [throttledValue, setThrottledValue] = useState(value)

  const throttleFn = useThrottleFn(
    () => {
      setThrottledValue(value)
    },
    wait,
    options
  )

  useEffect(() => {
    throttleFn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return throttledValue
}
