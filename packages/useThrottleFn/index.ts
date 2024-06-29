import { useMemo, useRef } from 'react'
import { throttle, ThrottleOptions } from '../utils/throttle'
import type { Noop } from '../utils/type'

function useThrottleFn(fn: Noop, options?: ThrottleOptions) {
  const optionsRef = useRef({ wait: 300, ...options })
  const fnRef = useRef(fn)
  return useMemo(() => throttle(fnRef.current, optionsRef.current), [])
}

export default useThrottleFn
