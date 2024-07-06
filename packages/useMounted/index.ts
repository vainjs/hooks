import { useRef, useEffect } from 'react'
import { isFunction } from '../utils'
import useLatest from '../useLatest'

function useMounted(fn: () => void) {
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

export default useMounted
