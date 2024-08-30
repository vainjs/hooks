import { type EffectCallback, type DependencyList, useEffect } from 'react'
import { type ThrottleOptions } from '@vainjs/ore'
import { useDeepCompareValue } from '../useDeepCompareValue'
import { useThrottleFn } from '../useThrottleFn'

interface useThrottleEffectOptions extends ThrottleOptions {
  deepCompare?: boolean
  wait?: number
}

export function useThrottleEffect(
  fn: EffectCallback,
  deps: DependencyList,
  options?: useThrottleEffectOptions
) {
  const { deepCompare, wait = 0, ...throttleOptions } = options || {}
  const throttleFn = useThrottleFn(fn, wait, throttleOptions)
  const deepCompareDeps = useDeepCompareValue(deps)

  useEffect(
    () => {
      throttleFn()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deepCompare ? deepCompareDeps : deps
  )
}
