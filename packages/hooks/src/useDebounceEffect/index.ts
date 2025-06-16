import { type EffectCallback, type DependencyList, useEffect } from 'react'
import { type DebounceOptions } from '@vainjs/ore'
import { useDebounceFn } from '../useDebounceFn'

type UseDebounceEffectOptions = DebounceOptions & {
  wait?: number
}

export function useDebounceEffect(
  fn: EffectCallback,
  deps: DependencyList,
  options?: UseDebounceEffectOptions
) {
  const { wait = 300, ...debounceOptions } = options || {}
  const debouncedFn = useDebounceFn(fn, wait, debounceOptions)

  useEffect(() => {
    debouncedFn()
  }, deps)
}
