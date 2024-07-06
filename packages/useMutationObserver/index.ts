import { useEffect, useRef } from 'react'
import { type BasicTarget, getTargetElement } from '../utils/domTarget'
import useLatest from '../useLatest'

function useMutationObserver(
  fn: MutationCallback,
  target: BasicTarget,
  options: MutationObserverInit = { childList: true, subtree: true }
) {
  const optionsRef = useRef(options)
  const targetRef = useLatest(target)
  const fnRef = useLatest(fn)

  useEffect(() => {
    const element = getTargetElement(targetRef.current)
    if (!element) return
    const observer = new MutationObserver(fnRef.current)
    observer.observe(element, optionsRef.current)
    return () => {
      observer.disconnect()
    }
  }, [fnRef, targetRef])
}

export default useMutationObserver
