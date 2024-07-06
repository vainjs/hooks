import { useEffect } from 'react'
import { type BasicTarget, getTargetElement } from '../utils/domTarget'
import useLatest from '../useLatest'

type DocumentEventName = keyof DocumentEventMap

function getArray<T>(data: T | T[]) {
  return Array.isArray(data) ? data : [data]
}

function useClickAway<T extends Event = Event>(
  fn: (event: T) => void,
  target: BasicTarget | BasicTarget[],
  eventName: DocumentEventName | DocumentEventName[] = 'click'
) {
  const eventNameRef = useLatest(eventName)
  const targetRef = useLatest(target)
  const fnRef = useLatest(fn)

  useEffect(() => {
    const handler = (event: any) => {
      const targets = getArray(targetRef.current)
      if (
        targets.some((item) => {
          const targetElement = getTargetElement(item)
          return !targetElement || targetElement.contains(event.target)
        })
      ) {
        return
      }
      fnRef.current(event)
    }
    const eventNames = getArray(eventNameRef.current)
    eventNames.forEach((event) => document.addEventListener(event, handler))

    return () => {
      eventNames.forEach((event) =>
        document.removeEventListener(event, handler)
      )
    }
  }, [eventNameRef, fnRef, targetRef])
}

export default useClickAway
