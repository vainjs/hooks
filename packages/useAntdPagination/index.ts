import type { PaginationProps } from 'antd/lib/pagination'
import type { DataItem } from '../utils/interface'
import { useState, useEffect, useCallback, useRef } from 'react'
import { filterParams } from '../utils'
import useMemoize from '../useMemoize'

export interface Request extends DataItem {
  pageSize: number
  page: number
}

export interface Response extends DataItem {
  /**
   * list data field
   */
  list: DataItem[]
  total: number
}

export interface Options {
  transformResponse?: (response: DataItem) => Response
  transformRequest?: (request: Request) => DataItem
  request: (params?: DataItem) => Promise<any>
  pagination?: PaginationProps
  immediateRequest?: boolean
  initParams?: DataItem
}

const defaultPagination = { total: 0, current: 1, pageSize: 10 }
const defaultOptions = {
  transformResponse: (response: DataItem) => ({
    list: [],
    total: 0,
    ...response,
  }),
  transformRequest: (request: Request) => request,
  immediateRequest: true,
  initParams: {},
}

/**
 * default request params: { page: 1, pageSize: 10, param1: 'a', param2: 'b'}
 * default response data: { code: 0, message: 'ok', data: { list: [], total: 100 } }
 */
function useAntdPagination(options: Options) {
  const memoOptions = useMemoize({ ...defaultOptions, ...options })
  const paginationRef = useRef({
    ...defaultPagination,
    ...memoOptions.pagination,
  })
  const paramsCacheRef = useRef({})
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])

  const getData = useCallback(
    (params = {}) => {
      const { request, initParams, transformRequest, transformResponse } =
        memoOptions
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
        .then((res: DataItem) => {
          res = transformResponse(res)
          paramsCacheRef.current = cache
          paginationRef.current.total = res.total
          setDataSource(res.list)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [memoOptions]
  )

  useEffect(() => {
    if (memoOptions.immediateRequest) {
      getData()
    }
  }, [getData, memoOptions])

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

  const onChange = useCallback(
    (page: number, pageSize: number) => {
      paginationRef.current.current = page
      paginationRef.current.pageSize = pageSize
      getData()
    },
    [getData]
  )

  return {
    pagination: {
      onChange,
      ...paginationRef.current,
    },
    refresh: getData,
    deleteRefresh,
    onSearch,
    dataSource,
    loading,
  }
}

export default useAntdPagination
