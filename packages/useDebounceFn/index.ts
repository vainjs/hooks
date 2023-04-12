import { useMemo, useRef } from 'react'
import { debounce, DebounceOptions } from '../utils/debounce'

function useDebounceFn(fn: Function, options?: DebounceOptions) {
  const fnRef = useRef(fn)
  const wait = options?.wait ?? 300

  const debounceFn = useMemo(() => debounce(fnRef.current, wait, options?.immediate), [])

  return { debounceFn }
}

export default useDebounceFn