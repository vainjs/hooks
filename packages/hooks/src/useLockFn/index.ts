import { useRef, useCallback } from 'react'
import { useLatest } from '../useLatest'

type Options = {
  /**
   * timing of unlocking: catch or finally
   */
  timing?: 'catch' | 'finally'
}

export function useLockFn<P extends unknown[] = unknown[], R = unknown>(
  fn: (...args: P) => Promise<R>,
  options: Options = { timing: 'finally' }
) {
  const optionsRef = useRef(options)
  const isLockedRef = useRef(false)
  const fnRef = useLatest(fn)

  return useCallback(
    (...args: P) => {
      if (!fnRef.current || isLockedRef.current) return
      isLockedRef.current = true

      const handle = fnRef.current(...args)
      if (!handle) return
      const { timing } = optionsRef.current
      if (timing === 'catch') {
        handle.catch((e) => {
          isLockedRef.current = false
          throw e
        })
      } else if (timing === 'finally') {
        handle.finally(() => {
          isLockedRef.current = false
        })
      }
    },
    [fnRef]
  )
}
