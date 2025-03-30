import { useEffect, useRef } from 'react'
import { type BasicTarget, getTargetElement } from '../utils/domTarget'
import { useLatest } from '../useLatest'

export function useIntersectionObserver(
  fn: IntersectionObserverCallback,
  target: BasicTarget,
  options: IntersectionObserverInit = {}
) {
  const optionsRef = useRef(options)
  const targetRef = useLatest(target)
  const fnRef = useLatest(fn)

  useEffect(() => {
    const element = getTargetElement(targetRef.current)
    if (!element) return
    const observer = new IntersectionObserver(fnRef.current, optionsRef.current)
    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [fnRef, targetRef])
}
