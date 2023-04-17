import { useEffect, useRef, useCallback } from 'react'
import { isNumber } from '../utils'

interface IntervalOptions {
  immediate?: boolean
}

function useInterval(
  fn: () => void,
  timeout = 0,
  options: IntervalOptions = {}
) {
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const optionsRef = useRef(options)
  const fnRef = useRef(fn)

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!isNumber(timeout) || timeout < 0) {
      throw new TypeError('timeout must be a number greater than 0')
    }
    if (optionsRef.current.immediate) {
      fnRef.current()
    }
    timerRef.current = setInterval(fnRef.current, timeout)
    return clear
  }, [clear, timeout])

  return clear
}

export default useInterval
