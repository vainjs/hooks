import { renderHook } from '@testing-library/react'
import { sleep } from '../../utils'
import useDebounceFn from '../index'

describe('useDebounceFn', () => {
  it('useDebounceFn should work', async () => {
    const callback = jest.fn()
    const hook = renderHook(() => useDebounceFn(callback, { wait: 300 }))

    hook.result.current.debounceFn()
    await sleep(100)
    expect(callback).not.toBeCalled()

    hook.result.current.debounceFn()
    await sleep(299)
    expect(callback).not.toBeCalled()

    hook.result.current.debounceFn()
    await sleep(301)
    expect(callback).toBeCalled()
  })

  it('useDebounceFn should work with immediate', async () => {
    const callback = jest.fn()
    const hook = renderHook(() =>
      useDebounceFn(callback, { wait: 300, immediate: true })
    )

    hook.result.current.debounceFn()
    expect(callback).toHaveBeenCalledTimes(1)

    hook.result.current.debounceFn()
    await sleep(100)
    expect(callback).toHaveBeenCalledTimes(1)

    hook.result.current.debounceFn()
    await sleep(299)
    expect(callback).toHaveBeenCalledTimes(1)

    hook.result.current.debounceFn()
    await sleep(301)
    expect(callback).toHaveBeenCalledTimes(2)
  })
})
