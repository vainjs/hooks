import { act, renderHook } from '@testing-library/react'
import { sleep } from '@vainjs/ore'
import { useThrottleEffect } from '../index'

describe('useThrottleEffect', () => {
  it('should call the function once at the beginning and once at the end if leading is true and trailing is true', async () => {
    const fn = jest.fn()
    let hook: any
    act(() => {
      hook = renderHook(
        ({ value }) => {
          useThrottleEffect(fn, [value], {
            trailing: true,
            leading: true,
            wait: 10,
          })
        },
        { initialProps: { value: 1 } }
      )
    })
    hook.rerender({ value: 2 })
    expect(fn).toHaveBeenCalledTimes(1)
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(2)
    hook.rerender({ value: 3 })
    expect(fn).toHaveBeenCalledTimes(2)
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(3)
    await sleep(10)
    hook.rerender({ value: 4 })
    hook.rerender({ value: 5 })
    expect(fn).toHaveBeenCalledTimes(4)
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(5)
    hook.rerender({ value: 6 })
    expect(fn).toHaveBeenCalledTimes(5)
  })

  it('should call the function only once immediately if leading is true and trailing is false', async () => {
    const fn = jest.fn()
    let hook: any
    act(() => {
      hook = renderHook(
        ({ value }) => {
          useThrottleEffect(fn, [value], {
            trailing: false,
            leading: true,
            wait: 10,
          })
        },
        { initialProps: { value: 1 } }
      )
    })
    hook.rerender({ value: 2 })
    hook.rerender({ value: 3 })
    expect(fn).toHaveBeenCalledTimes(1)
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(1)
    hook.rerender({ value: 4 })
    hook.rerender({ value: 5 })
    hook.rerender({ value: 6 })
    expect(fn).toHaveBeenCalledTimes(2)
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should call the function only once at the end if leading is false and trailing is true', async () => {
    const fn = jest.fn()
    let hook: any
    act(() => {
      hook = renderHook(
        ({ value }) => {
          useThrottleEffect(fn, [value], {
            trailing: true,
            leading: false,
            wait: 10,
          })
        },
        { initialProps: { value: 1 } }
      )
    })
    hook.rerender({ value: 2 })
    hook.rerender({ value: 3 })
    expect(fn).not.toHaveBeenCalled()
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(1)
    hook.rerender({ value: 4 })
    hook.rerender({ value: 5 })
    hook.rerender({ value: 6 })
    expect(fn).toHaveBeenCalledTimes(1)
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should not call the function at all if both leading and trailing are false', async () => {
    const fn = jest.fn()
    let hook: any
    act(() => {
      hook = renderHook(
        ({ value }) => {
          useThrottleEffect(fn, [value], {
            trailing: false,
            leading: false,
            wait: 10,
          })
        },
        { initialProps: { value: 1 } }
      )
    })
    hook.rerender({ value: 2 })
    hook.rerender({ value: 3 })
    expect(fn).not.toHaveBeenCalled()
    await sleep(10)
    expect(fn).not.toHaveBeenCalled()
  })

  it('should call the function only once immediately if leading is false and trailing is true and deepCompare is true', async () => {
    const fn = jest.fn()
    let hook: any
    act(() => {
      hook = renderHook(
        ({ value }) => {
          useThrottleEffect(fn, [value], {
            deepCompare: true,
            trailing: true,
            leading: false,
            wait: 10,
          })
        },
        { initialProps: { value: {} } }
      )
    })
    hook.rerender({ value: {} })
    hook.rerender({ value: {} })
    expect(fn).not.toHaveBeenCalled()
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(1)
    hook.rerender({ value: {} })
    hook.rerender({ value: {} })
    hook.rerender({ value: {} })
    expect(fn).toHaveBeenCalledTimes(1)
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
