import { type DebounceOptions, debounce } from '@vainjs/ore'
import { useMemo, useRef } from 'react'
import { useLatest } from '../useLatest'

export function useDebounceFn<T extends unknown[]>(
  fn: (...args: T) => void,
  wait = 0,
  options?: DebounceOptions
) {
  const optionsRef = useRef({ ...options })
  const fnRef = useLatest(fn)

  return useMemo(
    () =>
      debounce(
        (...args: T) => fnRef.current(...args),
        wait,
        optionsRef.current
      ),
    [fnRef, wait]
  )
}
