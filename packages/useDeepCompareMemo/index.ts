import { useMemo, DependencyList } from 'react'
import useDeepCompareRef from '../useDeepCompareRef'

function useDeepCompareMemo<T>(fn: () => T, deps: DependencyList) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(fn, useDeepCompareRef(deps))
}

export default useDeepCompareMemo
