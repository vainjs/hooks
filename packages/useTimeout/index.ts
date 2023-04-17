import { useEffect, useRef, useCallback } from 'react'
import { isNumber } from '../utils'

function useTimeout(fn: () => void, timeout = 0) {
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const fnRef = useRef(fn)

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!isNumber(timeout) || timeout < 0) {
      throw new TypeError('timeout must be a number greater than 0')
    }
    timerRef.current = setTimeout(fnRef.current, timeout)
    return clear
  }, [clear, timeout])

  return clear
}

export default useTimeout
