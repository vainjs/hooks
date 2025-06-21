import { useEffect, useRef, useCallback } from 'react'
import { isNumber } from '@vainjs/ore'

export type IntervalOptions = {
  immediate?: boolean
}

export function useInterval(
  fn: () => void,
  delay: number,
  options: IntervalOptions = {}
) {
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const fnRef = useRef(fn)

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const resume = useCallback(() => {
    if (timerRef.current) return
    if (!isNumber(delay) || delay < 0) return

    if (options.immediate) {
      fnRef.current()
    }
    timerRef.current = setInterval(fnRef.current, delay)
  }, [delay, options.immediate])

  useEffect(() => {
    resume()
    return clear
  }, [clear, resume])

  return { clear, resume }
}
