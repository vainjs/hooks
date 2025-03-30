import { type BasicTarget, getTargetElement } from '../utils/domTarget'
import { type CSSProperties, useCallback, useRef, useState } from 'react'
import { useMutationObserver } from '../useMutationObserver'
import { useResizeObserver } from '../useResizeObserver'

type Position = Pick<CSSProperties, 'position' | 'width' | 'left' | 'top'>

type Options = {
  attribute?: string
  width?: number
  gap?: number
}

const defaultOptions = {
  attribute: 'data-key',
  width: 320,
  gap: 16,
}

export function useWaterfallFlow(target: BasicTarget, options: Options = {}) {
  const optionsRef = useRef({ ...defaultOptions, ...options })
  const [position, setPoision] = useState<Map<string, Position>>(new Map())
  const maxHeightRef = useRef(0)

  const calculatePosition = useCallback((containerDom: HTMLElement) => {
    const containerWidth = containerDom.clientWidth
    const { width, gap, attribute } = optionsRef.current
    const columns = Math.floor(containerWidth / width)
    const actualWidth = (containerWidth - gap * (columns - 1)) / columns
    const nextTop = new Array(columns).fill(0)
    const pos = new Map<string, Position>()

    const size = containerDom.children.length
    for (let i = 0; i < size; i++) {
      const node = containerDom.children[i]
      const minTop = Math.min(...nextTop)
      const index = nextTop.indexOf(minTop)
      nextTop[index] += node.clientHeight + gap
      const key = node.getAttribute(attribute)
      if (!key)
        throw new Error(`Each child node must set the ${attribute} attribute!`)
      pos.set(key, {
        left: index * (actualWidth + gap),
        position: 'absolute',
        width: actualWidth,
        top: minTop,
      })
    }

    maxHeightRef.current = Math.max(...nextTop)
    setPoision(pos)
  }, [])

  useResizeObserver((entries) => {
    calculatePosition(entries[0].target as HTMLElement)
  }, target)

  useMutationObserver(() => {
    const element = getTargetElement(target)
    if (!element) return
    calculatePosition(element as HTMLElement)
  }, target)

  return {
    targetStyle: {
      position: 'relative' as const,
      height: maxHeightRef.current,
    },
    childNodeStyles: position,
  }
}
