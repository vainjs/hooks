import { type EffectCallback, type DependencyList, useEffect } from 'react'
import useDeepCompareValue from '../useDeepCompareValue'

function useDeepCompareEffect(fn: EffectCallback, deps: DependencyList) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(fn, useDeepCompareValue(deps))
}

export default useDeepCompareEffect
