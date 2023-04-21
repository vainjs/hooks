import { useEffect, EffectCallback, DependencyList } from 'react'
import useDeepCompareMemoize from '../useDeepCompareMemoize'

function useDeepCompareEffect(fn: EffectCallback, deps?: DependencyList) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(fn, useDeepCompareMemoize(deps))
}

export default useDeepCompareEffect
