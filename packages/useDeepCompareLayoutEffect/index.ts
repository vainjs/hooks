import { useLayoutEffect, EffectCallback, DependencyList } from 'react'
import useDeepCompareMemoize from '../useDeepCompareMemoize'

function useDeepCompareLayoutEffect(fn: EffectCallback, deps: DependencyList) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useLayoutEffect(fn, useDeepCompareMemoize(deps))
}

export default useDeepCompareLayoutEffect
