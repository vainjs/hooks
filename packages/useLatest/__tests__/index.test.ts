import { renderHook } from '@testing-library/react'
import useLatest from '../index'

describe('useLatest', () => {
  it('useLatest with basic type should work', async () => {
    const { result, rerender } = renderHook((state) => useLatest(state), {
      initialProps: 0,
    })
    expect(result.current.current).toBe(0)

    rerender(1)
    expect(result.current.current).toBe(1)

    rerender(2)
    expect(result.current.current).toBe(2)

    rerender(3)
    expect(result.current.current).toBe(3)
  })

  it('useLatest with reference type should work', async () => {
    const { result, rerender } = renderHook((state) => useLatest(state), {
      initialProps: {},
    })

    expect(result.current.current).toEqual({})

    rerender([])
    expect(result.current.current).toEqual([])

    rerender({ a: 1 })
    expect(result.current.current).toEqual({ a: 1 })
  })
})
