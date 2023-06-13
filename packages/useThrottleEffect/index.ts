import { useEffect, EffectCallback, DependencyList } from 'react'
import useDeepCompareRef from '../useDeepCompareRef'
import type { ThrottleOptions } from '../utils/throttle'
import useThrottleFn from '../useThrottleFn'

interface useThrottleEffectOptions extends ThrottleOptions {
  deepCompare?: boolean
}

function useThrottleEffect(
  fn: EffectCallback,
  deps: DependencyList,
  options: useThrottleEffectOptions = {}
) {
  const { deepCompare, ...throttleOptions } = options
  const { throttleFn } = useThrottleFn(fn, throttleOptions)
  const deepCompareDeps = useDeepCompareRef(deps)

  useEffect(
    () => {
      throttleFn()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deepCompare ? deepCompareDeps : deps
  )
}

export default useThrottleEffect
