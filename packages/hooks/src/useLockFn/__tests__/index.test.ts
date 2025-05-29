import { renderHook } from '@testing-library/react'
import { sleep } from '@vainjs/ore'
import { useLockFn } from '..'

describe('useLockFn', () => {
  it('should return a function', () => {
    const { result } = renderHook(() => useLockFn(() => Promise.resolve()))
    expect(result.current).toBeInstanceOf(Function)
  })

  it('should unlock after promise resolved when timing is "finally"', async () => {
    const fn = jest.fn(() => Promise.resolve())
    const { result } = renderHook(() => useLockFn(fn, { timing: 'finally' }))
    const lockedFn = result.current
    lockedFn()
    lockedFn()
    lockedFn()
    await sleep(1)
    expect(fn).toHaveBeenCalledTimes(1)
    lockedFn()
    lockedFn()
    lockedFn()
    await sleep(1)
    expect(fn).toHaveBeenCalledTimes(2)
    lockedFn()
    lockedFn()
    lockedFn()
    await sleep(1)
    expect(fn).toHaveBeenCalledTimes(3)
  })

  // it('should unlock after promise rejected when timing is "finally"', async () => {
  //   const fn = jest.fn().mockRejectedValue('rejected')
  //   const { result } = renderHook(() => useLockFn(fn, { timing: 'finally' }))
  //   const lockedFn = result.current
  //   try {
  //     lockedFn()
  //     lockedFn()
  //     lockedFn()
  //     await sleep(1)
  //     expect(fn).toHaveBeenCalledTimes(1)
  //     lockedFn()
  //     lockedFn()
  //     lockedFn()
  //     await sleep(1)
  //     expect(fn).toHaveBeenCalledTimes(2)
  //     lockedFn()
  //     lockedFn()
  //     lockedFn()
  //     await sleep(1)
  //     expect(fn).toHaveBeenCalledTimes(3)
  //   } catch (error) {}
  // })

  it('should lock after promise resolved when timing is "catch"', async () => {
    const fn = jest.fn(() => Promise.resolve())
    const { result } = renderHook(() => useLockFn(fn, { timing: 'catch' }))
    const lockedFn = result.current
    lockedFn()
    lockedFn()
    lockedFn()
    await sleep(1)
    expect(fn).toHaveBeenCalledTimes(1)
    lockedFn()
    lockedFn()
    lockedFn()
    await sleep(1)
    expect(fn).toHaveBeenCalledTimes(1)
    lockedFn()
    lockedFn()
    lockedFn()
    await sleep(1)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  // it('should unlock after promise rejected when timing is "catch"', async () => {
  //   const fn = jest.fn().mockRejectedValue('rejected')
  //   const { result } = renderHook(() => useLockFn(fn, { timing: 'catch' }))
  //   const lockedFn = result.current
  //   await act(async () => {
  //     try {
  //       lockedFn()
  //       lockedFn()
  //       lockedFn()
  //       await sleep(1)
  //     } catch (error) {}
  //   })
  // })
})
