import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { reduce } from '@vainjs/ore'
import { type BasicTarget, getTargetElement } from '../utils/domTarget'
import { useEventListener } from '../useEventListener'

type Values = Record<string, any>
type DataSource<T> = Record<string, T[]>
type Response = { list: Values[]; total: number }
type Request = Values

type UseInfiniteScrollOptions = {
  transformResponse?: (response: Values) => Response
  transformRequest?: (request: Request) => Request
  request: (params?: Values) => Promise<Values>
  pagination?: { current: number; pageSize: number }
  immediateRequest?: boolean
  target?: BasicTarget
  initParams?: Values
  threshold?: number
}

type FetchType = 'reset' | 'delete'

export const defaultPagination = { total: 0, current: 1, pageSize: 20 }
const defaultOptions = {
  transformRequest: (request: Request) => request,
  transformResponse: (response: Values): Response => ({
    total: response.pageInfo?.total || 0,
    list: response.content || [],
  }),
  immediateRequest: true,
  threshold: 100,
}

function onScrollFinish(scrollElement: Element) {
  if (!scrollElement) return Promise.resolve()
  let lastScrollTop = 0
  let rafId: number
  return new Promise<void>((resolve) => {
    const detect = () => {
      const { scrollTop } = scrollElement
      if (scrollTop === lastScrollTop) {
        rafId && window.cancelAnimationFrame(rafId)
        resolve()
      } else {
        lastScrollTop = scrollTop
        rafId = window.requestAnimationFrame(detect)
      }
    }
    window.requestAnimationFrame(detect)
  })
}

export function useInfiniteScroll<T extends Values = Values>(
  options: UseInfiniteScrollOptions
) {
  const optionsRef = useRef({ ...defaultOptions, ...options })
  const paginationRef = useRef({
    ...defaultPagination,
    ...optionsRef.current.pagination,
  })
  const scrollElementRef = useRef<Element | null>(null)
  const paramsCacheRef = useRef({})
  const hasMoreRef = useRef(true)
  const lockRef = useRef(false)
  const [dataSource, setDataSource] = useState<DataSource<T>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const { target } = optionsRef.current
    if (!target) return
    scrollElementRef.current = getTargetElement(target) || null
  }, [])

  /**
   * 定义数据更新行为
   */
  const getDataSource = useCallback((prev: DataSource<T>, type?: FetchType) => {
    if (type === 'reset') return {}
    if (type === 'delete') {
      const { current } = paginationRef.current
      if (current === 1) return {}
      return reduce(
        prev,
        (result, list, page) =>
          +page < current ? { ...result, [page]: list } : result,
        {}
      )
    }
    return prev
  }, [])

  const fetch = useCallback(
    async (params = {}, type?: FetchType) => {
      const {
        transformResponse,
        transformRequest,
        initParams = {},
        request,
      } = optionsRef.current
      const { current, pageSize } = paginationRef.current
      const actualParams = {
        ...initParams,
        ...paramsCacheRef.current,
        pageInfo: {
          pageNumber: current,
          needTotal: true,
          pageSize,
        },
        ...params,
      }
      setLoading(true)
      return request(transformRequest(actualParams))
        .then((res) => {
          const { total, list } = transformResponse(res)
          paramsCacheRef.current = actualParams
          paginationRef.current.total = total
          lockRef.current = false
          setDataSource((prev) => {
            prev = getDataSource(prev, type)
            hasMoreRef.current = current < Math.ceil(total / pageSize)
            return { ...prev, [current]: list }
          })
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [getDataSource]
  )

  useEffect(() => {
    if (optionsRef.current.immediateRequest) {
      fetch()
    }
  }, [fetch])

  const next = useCallback(() => {
    if (!hasMoreRef.current) return
    paginationRef.current.current += 1
    fetch()
  }, [fetch])

  /**
   * 通过 dataSource index 计算当前的页数
   */
  const getCurrentByIndex = useCallback((index: number) => {
    const current = Math.ceil((index + 1) / paginationRef.current.pageSize)
    if (current > 0 && current < paginationRef.current.current) return current
    return defaultPagination.current
  }, [])

  /**
   * 通过 dataSource index 可指定刷新第几页，并剔除当前页之后的所有数据
   */
  const deteleRefresh = useCallback(
    (index: number, params?: Values) => {
      paginationRef.current.current = getCurrentByIndex(index)
      return fetch(params, 'delete')
    },
    [fetch, getCurrentByIndex]
  )

  /**
   * 通过 dataSource index 可指定刷新第几页，其它页数据不变
   */
  const refresh = useCallback(
    async (index: number, params?: Values) => {
      const preCurrent = paginationRef.current.current
      paginationRef.current.current = getCurrentByIndex(index)
      return fetch(params).finally(() => {
        paginationRef.current.current = preCurrent
      })
    },
    [fetch, getCurrentByIndex]
  )

  const onScroll = useCallback(
    (e: any) => {
      if (!scrollElementRef.current) {
        scrollElementRef.current = e.target
      }
      if (lockRef.current) return
      const { scrollTop, clientHeight, scrollHeight } = e.target
      const { threshold } = optionsRef.current
      if (scrollTop + clientHeight + threshold >= scrollHeight) {
        lockRef.current = true
        next()
      }
    },
    [next]
  )

  useEventListener('scroll', onScroll, {
    target: scrollElementRef,
    defaultWindow: false,
  })

  const scrollTop = useCallback(async (top = 0) => {
    if (!scrollElementRef.current) return
    const dom = scrollElementRef.current
    lockRef.current = true
    if (dom.scrollTo) {
      dom.scrollTo({
        behavior: 'smooth',
        top,
      })
    } else {
      dom.scrollTop = top
    }
    return onScrollFinish(dom)
  }, [])

  const search = useCallback(
    async (params?: Values) => {
      paginationRef.current = {
        ...defaultPagination,
        ...optionsRef.current.pagination,
      }
      paramsCacheRef.current = {}
      hasMoreRef.current = true
      await scrollTop()
      return fetch(params, 'reset')
    },
    [fetch, scrollTop]
  )

  const actualDataSource = useMemo(
    () =>
      reduce(dataSource, (result, value) => result.concat(value), [] as T[]),
    [dataSource]
  )

  const currentDataSource = dataSource[paginationRef.current.current] || []

  return {
    initLoading: loading && paginationRef.current.current === 1,
    moreLoading: loading && paginationRef.current.current > 1,
    noMore: !hasMoreRef.current && currentDataSource.length > 1,
    dataSource: actualDataSource,
    hasMore: hasMoreRef.current,
    currentDataSource,
    deteleRefresh,
    reset: search,
    scrollTop,
    onScroll,
    refresh,
    loading,
    search,
    next,
  }
}

export type UseInfiniteScrollResult = ReturnType<typeof useInfiniteScroll>
