import { renderHook } from '@testing-library/react'
import { sleep } from '../../utils'
import useThrottleFn from '../index'

describe('useThrottleFn', () => {
  it('useThrottleFn should work', async () => {
    const fn = jest.fn()
    const hook = renderHook(() => useThrottleFn(fn, { wait: 300 }))

    hook.result.current()
    expect(fn).toHaveBeenCalledTimes(1)

    hook.result.current()
    await sleep(100)
    expect(fn).toHaveBeenCalledTimes(1)

    hook.result.current()
    await sleep(190)
    expect(fn).toHaveBeenCalledTimes(1)

    hook.result.current()
    await sleep(15)
    expect(fn).toHaveBeenCalledTimes(2)

    hook.result.current()
    expect(fn).toHaveBeenCalledTimes(2)

    hook.result.current()
    await sleep(301)
    expect(fn).toHaveBeenCalledTimes(3)
  })
})
