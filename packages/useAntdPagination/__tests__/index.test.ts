import { RenderHookResult, renderHook, act } from '@testing-library/react'
import { waitFor } from '@testing-library/react'
import { Response, useAntdPagination } from '../index'

type Result = ReturnType<typeof useAntdPagination>

const response = { total: 100, list: [{ a: 1 }, { a: 2 }, { a: 3 }] }

const mockApi = (): Promise<Response> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(response)
    }, 10)
  })

describe('useAntdPagination', () => {
  let hook: RenderHookResult<Result, any>

  it('useAntdPagination should work', async () => {
    act(() => {
      hook = renderHook(() => useAntdPagination({ request: mockApi }))
    })
    expect(hook.result.current.loading).toBe(true)
    expect(hook.result.current.pagination.total).toBe(0)
    expect(hook.result.current.dataSource).toEqual([])

    waitFor(() => {
      expect(hook.result.current.loading).toBe(false)
      expect(hook.result.current.pagination.total).toBe(response.total)
      expect(hook.result.current.dataSource).toEqual(response.list)
    })
  })

  let last: Result
  it('useAntdPagination export methods keep immutable', () => {
    act(() => {
      hook = renderHook(() => useAntdPagination({ request: mockApi }))
    })
    last = hook.result.current

    hook.rerender()
    expect(hook.result.current.refresh).toBe(last.refresh)

    hook.rerender()
    expect(hook.result.current.onSearch).toBe(last.onSearch)

    hook.rerender()
    expect(hook.result.current.deleteRefresh).toBe(last.deleteRefresh)
  })
})
