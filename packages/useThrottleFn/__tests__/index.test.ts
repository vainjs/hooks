import { renderHook } from '@testing-library/react'
import { sleep } from '../../utils'
import useThrottleFn from '../index'

describe('useThrottleFn', () => {
  it('useThrottleFn should work', async () => {
    const callback = jest.fn()
    const hook = renderHook(() => useThrottleFn(callback, { wait: 300 }))

    hook.result.current.throttleFn()
    expect(callback).toHaveBeenCalledTimes(1)

    hook.result.current.throttleFn()
    await sleep(100)
    expect(callback).toHaveBeenCalledTimes(1)

    hook.result.current.throttleFn()
    await sleep(190)
    expect(callback).toHaveBeenCalledTimes(1)

    hook.result.current.throttleFn()
    await sleep(10)
    expect(callback).toHaveBeenCalledTimes(2)

    hook.result.current.throttleFn()
    expect(callback).toHaveBeenCalledTimes(2)

    hook.result.current.throttleFn()
    await sleep(301)
    expect(callback).toHaveBeenCalledTimes(3)
  })
})
