import {
  type EffectCallback,
  type DependencyList,
  useLayoutEffect,
} from 'react'
import { useDeepCompareValue } from '../useDeepCompareValue'

export function useDeepCompareLayoutEffect(
  fn: EffectCallback,
  deps: DependencyList
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useLayoutEffect(fn, useDeepCompareValue(deps))
}
