import { useEffect, useRef, useCallback } from 'react'
import {
  type BasicTarget,
  type TargetType,
  getTargetElement,
} from '../utils/domTarget'
import { useLatest } from '../useLatest'

export type Target = BasicTarget<TargetType>

type noop = (...args: any[]) => void

type Options<T extends Target = Target> = AddEventListenerOptions & {
  defaultWindow?: boolean
  target?: T
}

export function useEventListener(
  eventName: string,
  handler: noop,
  options?: Options
) {
  const optionsRef = useRef(options || {})
  const targetRef = useRef<TargetType>()
  const handlerRef = useLatest(handler)

  useEffect(() => {
    const { target, defaultWindow = true } = optionsRef.current
    const targetElement = getTargetElement(
      target,
      defaultWindow ? window : undefined
    )
    if (!targetElement || !targetElement.addEventListener) return
    targetRef.current = targetElement
  }, [])

  const eventListener = useCallback(
    (event: Event) => handlerRef.current(event),
    [handlerRef]
  )

  const cleanup = useCallback(() => {
    if (!targetRef.current) return
    const { capture } = optionsRef.current
    targetRef.current.removeEventListener(eventName, eventListener, { capture })
  }, [eventListener, eventName])

  useEffect(() => {
    if (!targetRef.current) return
    const { passive, capture, once, signal } = optionsRef.current
    targetRef.current.addEventListener(eventName, eventListener, {
      passive,
      capture,
      signal,
      once,
    })

    return cleanup
  }, [cleanup, eventListener, eventName, handlerRef])

  return cleanup
}
