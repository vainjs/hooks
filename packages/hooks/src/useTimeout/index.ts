import { useEffect, useRef, useCallback } from 'react'
import { isNumber } from '@vainjs/ore'

export function useTimeout(fn: () => void, delay?: number) {
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const fnRef = useRef(fn)

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (timerRef.current) return
    if (!isNumber(delay) || delay < 0) return
    timerRef.current = setTimeout(fnRef.current, delay)
    return clear
  }, [clear, delay])

  return { clear }
}
