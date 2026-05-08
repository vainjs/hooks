import { type DependencyList, useMemo } from 'react'
import { useDeepCompareValue } from '../useDeepCompareValue'

export function useDeepCompareMemo<T>(fn: () => T, deps: DependencyList) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(fn, useDeepCompareValue(deps))
}
