import { useEffect, EffectCallback, DependencyList } from 'react'
import useDeepCompareRef from '../useDeepCompareRef'

function useDeepCompareEffect(fn: EffectCallback, deps: DependencyList) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(fn, useDeepCompareRef(deps))
}

export default useDeepCompareEffect
