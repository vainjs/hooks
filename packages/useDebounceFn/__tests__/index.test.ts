import { renderHook } from '@testing-library/react'
import { sleep } from '../../utils'
import useDebounceFn from '../index'

describe('useDebounceFn', () => {
  it('useDebounceFn should work', async () => {
    const fn = jest.fn()
    const hook = renderHook(() => useDebounceFn(fn, { wait: 300 }))

    hook.result.current.debounceFn()
    await sleep(100)
    expect(fn).not.toBeCalled()

    hook.result.current.debounceFn()
    await sleep(290)
    expect(fn).not.toBeCalled()

    hook.result.current.debounceFn()
    await sleep(310)
    expect(fn).toBeCalled()
  })

  it('useDebounceFn should work with immediate', async () => {
    const fn = jest.fn()
    const hook = renderHook(() =>
      useDebounceFn(fn, { wait: 300, immediate: true })
    )

    hook.result.current.debounceFn()
    expect(fn).toHaveBeenCalledTimes(1)

    hook.result.current.debounceFn()
    await sleep(100)
    expect(fn).toHaveBeenCalledTimes(1)

    hook.result.current.debounceFn()
    await sleep(290)
    expect(fn).toHaveBeenCalledTimes(1)

    hook.result.current.debounceFn()
    await sleep(310)
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
