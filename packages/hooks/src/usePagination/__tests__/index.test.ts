import { RenderHookResult, renderHook, act } from '@testing-library/react'
import { waitFor } from '@testing-library/react'
import { Response, usePagination } from '../index'

type Result = ReturnType<typeof usePagination>

const response = { total: 100, list: [{ a: 1 }, { a: 2 }, { a: 3 }] }

const mockApi = (): Promise<Response> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(response)
    }, 10)
  })

describe('usePagination', () => {
  let hook: RenderHookResult<Result, any>

  it('usePagination should work', async () => {
    act(() => {
      hook = renderHook(() => usePagination({ request: mockApi }))
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
  it('usePagination export methods keep immutable', () => {
    act(() => {
      hook = renderHook(() => usePagination({ request: mockApi }))
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
