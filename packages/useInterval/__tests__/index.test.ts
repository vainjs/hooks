import { renderHook } from '@testing-library/react'
import { useInterval } from '../index'

describe('useInterval', () => {
  jest.useFakeTimers()
  jest.spyOn(global, 'clearInterval')

  it('interval should be clear', () => {
    const fn = jest.fn()
    const { result } = renderHook(() => useInterval(fn, 100))
    expect(fn).not.toBeCalled()
    result.current()
    jest.advanceTimersByTime(300)
    expect(fn).not.toBeCalled()
    expect(window.clearInterval).toHaveBeenCalledTimes(1)
  })

  // it('interval should not to be called', () => {
  //   const fn = jest.fn()
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   renderHook(() => useInterval(fn, 'test'))
  //   jest.advanceTimersByTime(50)
  //   expect(fn).not.toBeCalled()

  //   renderHook(() => useInterval(fn, -2))
  //   jest.advanceTimersByTime(50)
  //   expect(fn).not.toBeCalled()
  // })

  it('interval should have been called 1 time', () => {
    const fn = jest.fn()
    renderHook(() => useInterval(fn, 10))
    expect(fn).not.toBeCalled()
    jest.advanceTimersByTime(11)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('interval should have been called 5 time', () => {
    const fn = jest.fn()
    renderHook(() => useInterval(fn, 100))
    expect(fn).not.toBeCalled()
    jest.advanceTimersByTime(520)
    expect(fn).toHaveBeenCalledTimes(5)
  })

  it('immediate in options should work', () => {
    const fn = jest.fn()
    renderHook(() => useInterval(fn, 100, { immediate: true }))
    expect(fn).toBeCalled()
    expect(fn).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(210)
    expect(fn).toHaveBeenCalledTimes(3)
  })
})
