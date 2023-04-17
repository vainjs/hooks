import { useMemo, useRef } from 'react'
import { debounce, Noop, DebounceOptions } from '../utils/debounce'

function useDebounceFn(fn: Noop, options?: DebounceOptions) {
  const optionsRef = useRef({ wait: 300, ...options })
  const fnRef = useRef(fn)

  const debounceFn = useMemo(
    () => debounce(fnRef.current, optionsRef.current),
    []
  )

  return { debounceFn }
}

export default useDebounceFn
