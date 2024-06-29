import {
  type EffectCallback,
  type DependencyList,
  useLayoutEffect,
} from 'react'
import useDeepCompareValue from '../useDeepCompareValue'

function useDeepCompareLayoutEffect(fn: EffectCallback, deps: DependencyList) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useLayoutEffect(fn, useDeepCompareValue(deps))
}

export default useDeepCompareLayoutEffect
