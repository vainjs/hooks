import { useMemo, useRef } from 'react'
import { throttle, ThrottleOptions } from '../utils/throttle'
import type { Noop } from '../utils/type'

export function useThrottleFn(fn: Noop, options?: ThrottleOptions) {
  const optionsRef = useRef({ wait: 300, ...options })
  const fnRef = useRef(fn)
  return useMemo(() => throttle(fnRef.current, optionsRef.current), [])
}
