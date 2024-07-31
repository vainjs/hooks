import { useMemo, useRef } from 'react'
import { debounce, DebounceOptions } from '../utils/debounce'
import type { Noop } from '../utils/type'

export function useDebounceFn(fn: Noop, options?: DebounceOptions) {
  const optionsRef = useRef({ wait: 300, ...options })
  const fnRef = useRef(fn)
  return useMemo(() => debounce(fnRef.current, optionsRef.current), [])
}
