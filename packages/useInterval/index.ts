import { useEffect, useRef, useCallback } from 'react'

interface IntervalOptions {
  immediate?: boolean
}

function useInterval(fn: Function, timeout = 0, options: IntervalOptions = {}) {
  const timerRef = useRef<number | null>(null)
  const fnRef = useRef(fn)

  const clear = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (options.immediate) {
      fnRef.current()
    }
    timerRef.current = window.setInterval(fnRef.current, timeout)
    return clear
  }, [])

  return clear
}

export default useInterval
