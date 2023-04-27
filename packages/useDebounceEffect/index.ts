import { useEffect, useState, EffectCallback, DependencyList } from 'react'
import type { DebounceOptions } from '../utils/debounce'
import useUpdateEffect from '../useUpdateEffect'
import useDebounceFn from '../useDebounceFn'

function useDebounceEffect(
  fn: EffectCallback,
  deps: DependencyList,
  options?: DebounceOptions
) {
  const [signal, setSignal] = useState(0)

  const { debounceFn } = useDebounceFn(() => {
    setSignal((v) => v + 1)
  }, options)

  useEffect(() => {
    debounceFn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useUpdateEffect(fn, [signal])
}

export default useDebounceEffect
