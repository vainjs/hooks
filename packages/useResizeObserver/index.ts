import { useEffect, useRef } from 'react'
import { type BasicTarget, getTargetElement } from '../utils/domTarget'
import useLatest from '../useLatest'

function useResizeObserver(
  fn: ResizeObserverCallback,
  target: BasicTarget,
  options: ResizeObserverOptions = {}
) {
  const optionsRef = useRef(options)
  const targetRef = useLatest(target)
  const fnRef = useLatest(fn)

  useEffect(() => {
    const element = getTargetElement(targetRef.current)
    if (!element) return
    const observer = new ResizeObserver(fnRef.current)
    observer.observe(element, optionsRef.current)
    return () => {
      observer.disconnect()
    }
  }, [fnRef, targetRef])
}

export default useResizeObserver
