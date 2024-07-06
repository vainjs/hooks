import { type BasicTarget } from '../utils/domTarget'
import { useEffect, useMemo, useCallback, useState, useRef } from 'react'
import useIntersectionObserver from '../useIntersectionObserver'

type UseLazyRenderOptions<T = any> = {
  target: BasicTarget
  dataSource: T[]
  limit?: number
}

export function useLazyRender<T>(options: UseLazyRenderOptions<T>) {
  const { limit = 50, target, dataSource = [] } = options || {}
  const [chunkData, setChunkData] = useState<T[]>([])
  const pageRef = useRef(0)

  const pages = useMemo(
    () => Math.ceil(dataSource.length / limit),
    [dataSource.length, limit]
  )

  const render = useCallback(() => {
    if (pages === 0) return
    pageRef.current += 1
    if (pageRef.current > pages) return
    setChunkData(dataSource.slice(0, pageRef.current * limit))
  }, [dataSource, limit, pages])

  useIntersectionObserver(render, target)

  useEffect(
    () => () => {
      pageRef.current = 0
    },
    []
  )

  return chunkData
}

export default useLazyRender
