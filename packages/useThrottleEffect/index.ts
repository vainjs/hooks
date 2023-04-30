import { useEffect, EffectCallback, DependencyList } from 'react'
import useDeepCompareMemoize from '../useDeepCompareMemoize'
import type { ThrottleOptions } from '../utils/debounce'
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
  const deepCompareDeps = useDeepCompareMemoize(deps)

  useEffect(
    () => {
      throttleFn()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deepCompare ? deepCompareDeps : deps
  )
}

export default useThrottleEffect
