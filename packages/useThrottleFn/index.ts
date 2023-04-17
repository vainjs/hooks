import { useMemo, useRef } from 'react'
import { throttle, Noop, ThrottleOptions } from '../utils/debounce'

function useThrottleFn(fn: Noop, options?: ThrottleOptions) {
  const optionsRef = useRef({ wait: 300, ...options })
  const fnRef = useRef(fn)

  const throttleFn = useMemo(
    () => throttle(fnRef.current, optionsRef.current),
    []
  )

  return { throttleFn }
}

export default useThrottleFn
