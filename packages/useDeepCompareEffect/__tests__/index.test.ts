import { act, renderHook } from '@testing-library/react'
import { useState } from 'react'
import { useDeepCompareEffect } from '../index'

describe('useDeepCompareEffect', () => {
  it('useDeepCompareEffect should work', async () => {
    const fn = jest.fn()
    const hook = renderHook(() => {
      const [value, setValue] = useState({})
      useDeepCompareEffect(fn, [value])
      return { setValue }
    })
    expect(fn).toHaveBeenCalledTimes(1)

    await act(async () => {
      hook.result.current.setValue({ a: 1, b: 2 })
    })
    expect(fn).toHaveBeenCalledTimes(2)

    await act(async () => {
      hook.result.current.setValue({ b: 2, a: 1 })
    })
    expect(fn).toHaveBeenCalledTimes(2)

    await act(async () => {
      hook.result.current.setValue({ a: 1 })
    })
    expect(fn).toHaveBeenCalledTimes(3)

    await act(async () => {
      hook.result.current.setValue({ a: 1 })
    })
    expect(fn).toHaveBeenCalledTimes(3)
  })
})
