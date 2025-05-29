import { type BasicTarget } from '../utils/domTarget'
import { useEffect, useMemo, useCallback, useState, useRef } from 'react'
import { useIntersectionObserver } from '../useIntersectionObserver'

type UseLazyRenderOptions<T = any> = {
  target: BasicTarget
  dataSource: T[]
  limit?: number
}

export function useLazyRender<T>(options: UseLazyRenderOptions<T>) {
  const optionsRef = useRef({ limit: 50, ...options })
  const [chunkData, setChunkData] = useState<T[]>([])
  const pageRef = useRef(0)

  const pages = useMemo(() => {
    const { dataSource, limit } = optionsRef.current
    return Math.ceil(dataSource.length / limit)
  }, [])

  const render = useCallback(() => {
    if (pages === 0) return
    pageRef.current += 1
    if (pageRef.current > pages) return
    const { dataSource, limit } = optionsRef.current
    setChunkData(dataSource.slice(0, pageRef.current * limit))
  }, [pages])

  useIntersectionObserver(render, optionsRef.current.target)

  useEffect(
    () => () => {
      pageRef.current = 0
    },
    []
  )

  return chunkData
}
