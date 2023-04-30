import { useEffect, EffectCallback, DependencyList } from 'react'
import useDeepCompareMemoize from '../useDeepCompareMemoize'
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
  const deepCompareDeps = useDeepCompareMemoize(deps)

  useEffect(
    () => {
      debounceFn()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deepCompare ? deepCompareDeps : deps
  )
}

export default useDebounceEffect
