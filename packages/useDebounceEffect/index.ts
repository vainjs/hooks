import { type EffectCallback, type DependencyList, useEffect } from 'react'
import { type DebounceOptions } from '../utils/debounce'
import { useDeepCompareValue } from '../useDeepCompareValue'
import { useDebounceFn } from '../useDebounceFn'

type useDebounceEffectOptions = DebounceOptions & {
  deepCompare?: boolean
}

export function useDebounceEffect(
  fn: EffectCallback,
  deps: DependencyList,
  options: useDebounceEffectOptions = {}
) {
  const { deepCompare, ...debounceOptions } = options
  const debounceFn = useDebounceFn(fn, debounceOptions)
  const deepCompareDeps = useDeepCompareValue(deps)

  useEffect(
    () => {
      debounceFn()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deepCompare ? deepCompareDeps : deps
  )
}
