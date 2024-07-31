import { renderHook, act } from '@testing-library/react'
import { useState } from 'react'
import { sleep } from '../../utils'
import { useThrottleEffect } from '../index'

describe('useThrottleEffect', () => {
  it('useThrottleEffect should work', async () => {
    const fn = jest.fn()
    const hook = renderHook(() => {
      const [value, setValue] = useState({})
      useThrottleEffect(fn, [value])
      return { setValue }
    })
    expect(fn).toHaveBeenCalledTimes(1)

    await act(async () => {
      hook.result.current.setValue({ a: 1, b: 2 })
    })
    await sleep(310)
    expect(fn).toHaveBeenCalledTimes(2)

    await act(async () => {
      hook.result.current.setValue({ b: 2, a: 1 })
    })
    await sleep(310)
    expect(fn).toHaveBeenCalledTimes(3)

    await act(async () => {
      hook.result.current.setValue({})
    })
    await sleep(310)
    expect(fn).toHaveBeenCalledTimes(4)
  })

  it('useThrottleEffect should work with deepCompare', async () => {
    const fn = jest.fn()
    const hook = renderHook(() => {
      const [value, setValue] = useState({})
      useThrottleEffect(fn, [value], { deepCompare: true, wait: 100 })
      return { setValue }
    })
    expect(fn).toHaveBeenCalledTimes(1)

    await act(async () => {
      hook.result.current.setValue({ a: 1, b: 2 })
    })
    await sleep(110)
    expect(fn).toHaveBeenCalledTimes(2)

    await act(async () => {
      hook.result.current.setValue({ b: 2, a: 1 })
    })
    await sleep(110)
    expect(fn).toHaveBeenCalledTimes(2)

    await act(async () => {
      hook.result.current.setValue({})
    })
    await sleep(110)
    expect(fn).toHaveBeenCalledTimes(3)
  })
})
