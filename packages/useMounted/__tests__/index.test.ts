import { renderHook } from '@testing-library/react'
import { useMounted } from '..'

describe('useMounted', () => {
  it('should call the provided function once when the component is mounted', () => {
    const fn = jest.fn()
    const { rerender } = renderHook(() => {
      useMounted(() => {
        fn()
      })
    })

    expect(fn).toHaveBeenCalledTimes(1)
    rerender()
    expect(fn).toHaveBeenCalledTimes(1)
    rerender()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
