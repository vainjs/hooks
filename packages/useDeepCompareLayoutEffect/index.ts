import { useLayoutEffect, EffectCallback, DependencyList } from 'react'
import useDeepCompareRef from '../useDeepCompareRef'

function useDeepCompareLayoutEffect(fn: EffectCallback, deps: DependencyList) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useLayoutEffect(fn, useDeepCompareRef(deps))
}

export default useDeepCompareLayoutEffect
