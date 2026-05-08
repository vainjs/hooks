import { type EffectCallback, type DependencyList, useEffect } from 'react'
import { type DebounceOptions } from '@vainjs/ore'
import { useDeepCompareValue } from '../useDeepCompareValue'
import { useDebounceFn } from '../useDebounceFn'

export type UseDebounceEffectOptions = DebounceOptions & {
  deep?: boolean
  wait?: number
}

export function useDebounceEffect(
  fn: EffectCallback,
  deps: DependencyList,
  options?: UseDebounceEffectOptions
) {
  const { wait = 300, deep = false, ...debounceOptions } = options || {}
  const debouncedFn = useDebounceFn(fn, wait, debounceOptions)
  const deepDeps = useDeepCompareValue(deps)

  useEffect(
    () => {
      debouncedFn()
    },
    deep ? deepDeps : deps
  )
}
