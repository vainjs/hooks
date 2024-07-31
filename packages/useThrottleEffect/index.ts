import { type EffectCallback, type DependencyList, useEffect } from 'react'
import { type ThrottleOptions } from '../utils/throttle'
import { useDeepCompareValue } from '../useDeepCompareValue'
import { useThrottleFn } from '../useThrottleFn'

interface useThrottleEffectOptions extends ThrottleOptions {
  deepCompare?: boolean
}

export function useThrottleEffect(
  fn: EffectCallback,
  deps: DependencyList,
  options: useThrottleEffectOptions = {}
) {
  const { deepCompare, ...throttleOptions } = options
  const throttleFn = useThrottleFn(fn, throttleOptions)
  const deepCompareDeps = useDeepCompareValue(deps)

  useEffect(
    () => {
      throttleFn()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deepCompare ? deepCompareDeps : deps
  )
}
