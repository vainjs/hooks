import { useEffect } from 'react'
import { isFunction } from '../utils'
import { useLatest } from '../useLatest'

export function useUnmounted(fn: () => void) {
  const fnRef = useLatest(fn)

  useEffect(
    () => () => {
      if (isFunction(fnRef.current)) {
        fnRef.current()
      }
    },
    [fnRef]
  )
}
