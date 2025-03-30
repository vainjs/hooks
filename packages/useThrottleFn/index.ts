import { type ThrottleOptions, throttle } from '@vainjs/ore'
import { useMemo, useRef } from 'react'
import { useLatest } from '../useLatest'

export function useThrottleFn<T extends unknown[]>(
  fn: (...args: T) => void,
  wait = 0,
  options?: ThrottleOptions
) {
  const optionsRef = useRef({ ...options })
  const fnRef = useLatest(fn)

  return useMemo(
    () =>
      throttle(
        (...args: T) => fnRef.current(...args),
        wait,
        optionsRef.current
      ),
    [fnRef, wait]
  )
}
