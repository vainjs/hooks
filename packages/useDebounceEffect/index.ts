import { useEffect, EffectCallback, DependencyList } from 'react'
import useDeepCompareRef from '../useDeepCompareRef'
import type { DebounceOptions } from '../utils/debounce'
import useDebounceFn from '../useDebounceFn'

interface useDebounceEffectOptions extends DebounceOptions {
  deepCompare?: boolean
}

function useDebounceEffect(
  fn: EffectCallback,
  deps: DependencyList,
  options: useDebounceEffectOptions = {}
) {
  const { deepCompare, ...debounceOptions } = options
  const { debounceFn } = useDebounceFn(fn, debounceOptions)
  const deepCompareDeps = useDeepCompareRef(deps)

  useEffect(
    () => {
      debounceFn()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deepCompare ? deepCompareDeps : deps
  )
}

export default useDebounceEffect
