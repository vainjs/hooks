import { renderHook, act } from '@testing-library/react'
import { useState } from 'react'
import { sleep } from '../../utils'
import { useDebounceEffect } from '../index'

describe('useDebounceEffect', () => {
  it('useDebounceEffect should work', async () => {
    const fn = jest.fn()
    const hook = renderHook(() => {
      const [value, setValue] = useState({})
      useDebounceEffect(fn, [value])
      return { setValue }
    })
    expect(fn).not.toBeCalled()

    await act(async () => {
      hook.result.current.setValue({})
    })
    await sleep(100)
    expect(fn).not.toBeCalled()

    await act(async () => {
      hook.result.current.setValue({})
    })
    await sleep(290)
    expect(fn).not.toBeCalled()

    await act(async () => {
      hook.result.current.setValue({})
    })
    await sleep(301)
    expect(fn).toHaveBeenCalledTimes(1)

    await act(async () => {
      hook.result.current.setValue({})
    })
    await sleep(301)
    expect(fn).toHaveBeenCalledTimes(2)

    await act(async () => {
      hook.result.current.setValue({})
    })
    await sleep(301)
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('useDebounceEffect should work with immediate', async () => {
    const fn = jest.fn()
    const hook = renderHook(() => {
      const [value, setValue] = useState({})
      useDebounceEffect(fn, [value], { immediate: true, wait: 100 })
      return { setValue }
    })
    expect(fn).toHaveBeenCalledTimes(1)

    await act(async () => {
      hook.result.current.setValue({})
    })
    await sleep(90)
    expect(fn).toHaveBeenCalledTimes(1)

    await act(async () => {
      hook.result.current.setValue({})
    })
    await sleep(100)
    expect(fn).toHaveBeenCalledTimes(2)

    await act(async () => {
      hook.result.current.setValue({})
    })
    await sleep(110)
    expect(fn).toHaveBeenCalledTimes(4)
  })

  it('useDebounceEffect should work with deepCompare', async () => {
    const fn = jest.fn()
    const hook = renderHook(() => {
      const [value, setValue] = useState({})
      useDebounceEffect(fn, [value], { deepCompare: true, wait: 100 })
      return { setValue }
    })
    expect(fn).toHaveBeenCalledTimes(0)

    await act(async () => {
      hook.result.current.setValue({})
    })
    await sleep(110)
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
      hook.result.current.setValue({ a: 1 })
    })
    await sleep(110)
    expect(fn).toHaveBeenCalledTimes(3)
  })
})
