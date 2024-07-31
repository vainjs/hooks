import type { MutableRefObject } from 'react'
import { isFunction, isBrowser } from './index'

type TargetValue<T> = T | undefined | null

export type TargetType = HTMLElement | Element | Window | Document

export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>

export function getTargetElement<T extends TargetType>(
  target: BasicTarget<T>,
  defaultElement?: T
) {
  if (!isBrowser) return undefined
  if (!target) return defaultElement
  if (isFunction(target)) return target()
  if ('current' in target) return target.current
  return target
}
