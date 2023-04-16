import { renderHook } from '@testing-library/react'
import useTimeout from '../index'

describe('useTimeout', () => {
  jest.useFakeTimers()
  jest.spyOn(global, 'clearTimeout')

  it('timeout should be clear', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useTimeout(callback, 100))
    expect(callback).not.toBeCalled()
    result.current()
    jest.advanceTimersByTime(110)
    expect(callback).toHaveBeenCalledTimes(0)
    expect(clearTimeout).toHaveBeenCalledTimes(1)
  })

  it('timeout should work', () => {
    const callback = jest.fn()
    renderHook(() => useTimeout(callback, 100))
    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(101)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('timeout should stop', () => {
    const callback = jest.fn()
    renderHook(() => useTimeout(callback, 100))
    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(50)
    expect(callback).toHaveBeenCalledTimes(0)
  })
})
