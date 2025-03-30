import { act, renderHook } from '@testing-library/react'
import { sleep } from '@vainjs/ore'
import { useState } from 'react'
import { useDebounceEffect } from '../index'

describe('useDebounceEffect', () => {
  it('should call the function once at the beginning and once at the end if leading is true and trailing is true', async () => {
    const fn = jest.fn()
    const hook = renderHook(() => {
      const [value, setValue] = useState({})
      useDebounceEffect(fn, [value], {
        trailing: true,
        leading: true,
        wait: 10,
      })
      return setValue
    })
    act(() => {
      hook.result.current({})
      hook.result.current({})
      hook.result.current({})
    })
    expect(fn).toHaveBeenCalledTimes(1)
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(2)
    act(() => {
      hook.result.current({})
      hook.result.current({})
      hook.result.current({})
    })
    expect(fn).toHaveBeenCalledTimes(3)
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(4)
  })

  it('should call the function only once immediately if leading is true and trailing is false', async () => {
    const fn = jest.fn()
    const hook = renderHook(() => {
      const [value, setValue] = useState({})
      useDebounceEffect(fn, [value], {
        trailing: false,
        leading: true,
        wait: 10,
      })
      return setValue
    })
    act(() => {
      hook.result.current({})
      hook.result.current({})
      hook.result.current({})
    })
    expect(fn).toHaveBeenCalledTimes(1)
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(1)
    act(() => {
      hook.result.current({})
      hook.result.current({})
      hook.result.current({})
    })
    expect(fn).toHaveBeenCalledTimes(2)
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should call the function only once at the end if leading is false and trailing is true', async () => {
    const fn = jest.fn()
    const hook = renderHook(() => {
      const [value, setValue] = useState({})
      useDebounceEffect(fn, [value], {
        trailing: true,
        leading: false,
        wait: 10,
      })
      return setValue
    })
    act(() => {
      hook.result.current({})
      hook.result.current({})
      hook.result.current({})
    })
    expect(fn).not.toHaveBeenCalled()
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(1)
    act(() => {
      hook.result.current({})
      hook.result.current({})
      hook.result.current({})
    })
    expect(fn).toHaveBeenCalledTimes(1)
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should not call the function at all if both leading and trailing are false', async () => {
    const fn = jest.fn()
    const hook = renderHook(() => {
      const [value, setValue] = useState({})
      useDebounceEffect(fn, [value], {
        trailing: false,
        leading: false,
        wait: 10,
      })
      return setValue
    })
    act(() => {
      hook.result.current({})
      hook.result.current({})
      hook.result.current({})
    })
    expect(fn).not.toHaveBeenCalled()
    await sleep(10)
    expect(fn).not.toHaveBeenCalled()
  })

  it('should call the function only once immediately if leading is false and trailing is true and deepCompare is true', async () => {
    const fn = jest.fn()
    const hook = renderHook(() => {
      const [value, setValue] = useState({})
      useDebounceEffect(fn, [value], {
        deepCompare: true,
        trailing: true,
        leading: false,
        wait: 10,
      })
      return setValue
    })
    act(() => {
      hook.result.current({})
      hook.result.current({})
      hook.result.current({})
    })
    expect(fn).not.toHaveBeenCalled()
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(1)
    act(() => {
      hook.result.current({})
      hook.result.current({})
      hook.result.current({})
    })
    expect(fn).toHaveBeenCalledTimes(1)
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
