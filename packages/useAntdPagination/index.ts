import type { PaginationProps } from 'antd/lib/pagination'
import type { DataItem } from '../utils/type'
import { useState, useEffect, useCallback, useRef } from 'react'
import { filterParams } from '../utils'

export type Request = {
  pageSize: number
  page: number
} & DataItem

export type Response = {
  list: DataItem[]
  total: number
} & DataItem

export type Options = {
  transformResponse?: (response: Response) => Response
  transformRequest?: (request: Request) => Request
  request: (params?: Request) => Promise<Response>
  pagination?: PaginationProps
  immediateRequest?: boolean
  initParams?: DataItem
}

const defaultPagination = { total: 0, current: 1, pageSize: 10 }
const defaultOptions = {
  transformResponse: (response: Response) => ({
    total: response.total,
    list: response.list,
  }),
  transformRequest: (request: Request) => request,
  immediateRequest: true,
  initParams: {},
}

/**
 * default request params: { page: 1, pageSize: 10, param1: 'a', param2: 'b'}
 * default response data: { code: 0, message: 'ok', data: { list: [], total: 100 } }
 */
export function useAntdPagination<T extends DataItem = DataItem>(
  options: Options
) {
  const optionsRef = useRef({ ...defaultOptions, ...options })
  const paginationRef = useRef({
    ...defaultPagination,
    ...optionsRef.current.pagination,
  })
  const paramsCacheRef = useRef({})
  const [dataSource, setDataSource] = useState<T[]>([])
  const [loading, setLoading] = useState(false)

  const getData = useCallback(async (params = {}) => {
    const { request, initParams, transformRequest, transformResponse } =
      optionsRef.current
    const { current, pageSize } = paginationRef.current
    const cache = transformRequest({
      ...initParams,
      ...paramsCacheRef.current,
      page: current,
      pageSize,
      ...filterParams(params),
    })
    setLoading(true)
    return request(cache)
      .then((res) => {
        res = transformResponse(res)
        paramsCacheRef.current = cache
        paginationRef.current.total = res.total
        setDataSource(res.list as T[])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (optionsRef.current.immediateRequest) {
      getData()
    }
  }, [getData])

  const onSearch = useCallback(
    (params?: DataItem) => {
      paginationRef.current.current = 1
      paramsCacheRef.current = {}
      return getData(params)
    },
    [getData]
  )

  /**
   * Used to process the last data deletion of the current page
   */
  const deleteRefresh = useCallback(() => {
    const { current, pageSize, total } = paginationRef.current
    if (current > 1 && total % pageSize === 1) {
      paginationRef.current.current = current - 1
    }
    getData()
  }, [getData])

  const pagination = {
    onChange(page: number, pageSize: number) {
      paginationRef.current.current =
        pageSize !== paginationRef.current.pageSize ? 1 : page
      paginationRef.current.pageSize = pageSize
      getData()
    },
    ...paginationRef.current,
  }

  return {
    paramsCache: paramsCacheRef.current,
    refresh: getData,
    deleteRefresh,
    dataSource,
    pagination,
    onSearch,
    loading,
  }
}
