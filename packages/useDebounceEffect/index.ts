import { type EffectCallback, type DependencyList, useEffect } from 'react'
import { type DebounceOptions } from '@vainjs/ore'
import { useDeepCompareValue } from '../useDeepCompareValue'
import { useDebounceFn } from '../useDebounceFn'

type useDebounceEffectOptions = DebounceOptions & {
  deepCompare?: boolean
  wait?: number
}

export function useDebounceEffect(
  fn: EffectCallback,
  deps: DependencyList,
  options?: useDebounceEffectOptions
) {
  const { deepCompare, wait = 0, ...debounceOptions } = options || {}
  const debouncedFn = useDebounceFn(fn, wait, debounceOptions)
  const deepCompareDeps = useDeepCompareValue(deps)

  useEffect(
    () => {
      debouncedFn()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deepCompare ? deepCompareDeps : deps
  )
}
