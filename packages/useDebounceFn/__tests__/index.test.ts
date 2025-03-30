import { renderHook } from '@testing-library/react'
import { sleep } from '@vainjs/ore'
import { useDebounceFn } from '../index'

describe('useDebounceFn', () => {
  it('should call the function once at the beginning and once at the end if leading is true and trailing is true', async () => {
    const fn = jest.fn()
    const hook = renderHook(() =>
      useDebounceFn(fn, 10, { leading: true, trailing: true })
    )
    hook.result.current()
    hook.result.current()
    hook.result.current()
    expect(fn).toHaveBeenCalledTimes(1)
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(2)
    hook.result.current()
    hook.result.current()
    hook.result.current()
    expect(fn).toHaveBeenCalledTimes(3)
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(4)
  })

  it('should call the function only once immediately if leading is true and trailing is false', async () => {
    const fn = jest.fn()
    const hook = renderHook(() =>
      useDebounceFn(fn, 10, { leading: true, trailing: false })
    )
    hook.result.current()
    hook.result.current()
    hook.result.current()
    expect(fn).toHaveBeenCalledTimes(1)
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(1)
    hook.result.current()
    hook.result.current()
    hook.result.current()
    expect(fn).toHaveBeenCalledTimes(2)
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should call the function only once at the end if leading is false and trailing is true', async () => {
    const fn = jest.fn()
    const hook = renderHook(() =>
      useDebounceFn(fn, 10, { leading: false, trailing: true })
    )
    hook.result.current()
    hook.result.current()
    hook.result.current()
    expect(fn).not.toHaveBeenCalled()
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(1)
    hook.result.current()
    hook.result.current()
    hook.result.current()
    expect(fn).toHaveBeenCalledTimes(1)
    await sleep(10)
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
