import { isFunction } from '@vainjs/ore'
import { useEffect } from 'react'
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
