import { useEffect, EffectCallback, DependencyList } from 'react'
import type { DebounceOptions } from '../utils/debounce'
import useDebounceFn from '../useDebounceFn'

function useDebounceEffect(
  fn: EffectCallback,
  deps: DependencyList,
  options?: DebounceOptions
) {
  const { debounceFn } = useDebounceFn(fn, options)

  useEffect(() => {
    debounceFn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useDebounceEffect
