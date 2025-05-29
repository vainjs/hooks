import { useRef, useEffect } from 'react'
import { isFunction } from '@vainjs/ore'
import { useLatest } from '../useLatest'

export function useMounted(fn: () => void) {
  const isMountedRef = useRef(false)
  const fnRef = useLatest(fn)

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true
      if (isFunction(fnRef.current)) {
        fnRef.current()
      }
    }
  }, [fnRef])
}
