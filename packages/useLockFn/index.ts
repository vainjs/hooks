import { useRef, useCallback } from 'react'
import useLatest from '../useLatest'

type Options = {
  /**
   * timing of unlocking: catch or finally
   */
  timing?: 'catch' | 'finally'
}

function useLockFn<P extends any[] = any[], R = any>(
  fn: (...args: P) => Promise<R>,
  options: Options = { timing: 'catch' }
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

export default useLockFn
