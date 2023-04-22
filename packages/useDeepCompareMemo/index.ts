import { useMemo, DependencyList } from 'react'
import useDeepCompareMemoize from '../useDeepCompareMemoize'

function useDeepCompareMemo<T>(fn: () => T, deps: DependencyList) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(fn, useDeepCompareMemoize(deps))
}

export default useDeepCompareMemo
