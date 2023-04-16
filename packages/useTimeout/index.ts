import { useEffect, useRef, useCallback } from 'react'
import { isNumber } from '../utils'

function useTimeout(fn: () => void, timeout = 0) {
  const timerRef = useRef<number | null>(null)
  const fnRef = useRef(fn)

  const clear = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!isNumber(timeout) || timeout < 0) {
      throw new TypeError('timeout must be a number greater than 0')
    }
    timerRef.current = window.setTimeout(fnRef.current, timeout)
    return clear
  }, [clear, timeout])

  return clear
}

export default useTimeout
