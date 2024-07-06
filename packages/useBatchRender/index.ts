import { useEffect, useMemo, useCallback, useState, useRef } from 'react'

type UseBatchRenderOptions<T = any> = {
  dataSource: T[]
  limit?: number
}

function useBatchRender<T>(options: UseBatchRenderOptions<T>) {
  const { limit = 50, dataSource = [] } = options || {}
  const [chunkData, setChunkData] = useState<T[]>([])
  const rafIdRef = useRef<number>()
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
    rafIdRef.current = window.requestAnimationFrame(render)
  }, [pages, dataSource, limit])

  const cleanup = useCallback(() => {
    pageRef.current = 0
    if (rafIdRef.current) {
      window.cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = undefined
    }
  }, [])

  useEffect(() => {
    render()
    return cleanup
  }, [cleanup, render])

  return { dataSource: chunkData, cleanup }
}

export default useBatchRender
