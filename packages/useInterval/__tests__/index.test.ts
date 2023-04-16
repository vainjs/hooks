import { renderHook } from '@testing-library/react'
import useInterval from '../index'

describe('useInterval', () => {
  jest.useFakeTimers()
  jest.spyOn(global, 'clearInterval')

  it('interval should be clear', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useInterval(callback, 100))
    expect(callback).not.toBeCalled()
    result.current()
    jest.advanceTimersByTime(300)
    expect(callback).not.toBeCalled()
    expect(window.clearInterval).toHaveBeenCalledTimes(1)
  })

  // it('interval should not to be called', () => {
  //   const callback = jest.fn()
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   renderHook(() => useInterval(callback, 'test'))
  //   jest.advanceTimersByTime(50)
  //   expect(callback).not.toBeCalled()

  //   renderHook(() => useInterval(callback, -2))
  //   jest.advanceTimersByTime(50)
  //   expect(callback).not.toBeCalled()
  // })

  it('interval should have been called 1 time', () => {
    const callback = jest.fn()
    renderHook(() => useInterval(callback, 10))
    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(11)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('interval should have been called 5 time', () => {
    const callback = jest.fn()
    renderHook(() => useInterval(callback, 100))
    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(520)
    expect(callback).toHaveBeenCalledTimes(5)
  })

  it('immediate in options should work', () => {
    const callback = jest.fn()
    renderHook(() => useInterval(callback, 100, { immediate: true }))
    expect(callback).toBeCalled()
    expect(callback).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(210)
    expect(callback).toHaveBeenCalledTimes(3)
  })
})
