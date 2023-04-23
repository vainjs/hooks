import { renderHook } from '@testing-library/react'
import useTimeout from '../index'

describe('useTimeout', () => {
  jest.useFakeTimers()
  jest.spyOn(global, 'clearTimeout')

  it('timeout should be clear', () => {
    const fn = jest.fn()
    const { result } = renderHook(() => useTimeout(fn, 100))
    expect(fn).not.toBeCalled()
    result.current()
    jest.advanceTimersByTime(110)
    expect(fn).toHaveBeenCalledTimes(0)
    expect(clearTimeout).toHaveBeenCalledTimes(1)
  })

  it('timeout should work', () => {
    const fn = jest.fn()
    renderHook(() => useTimeout(fn, 100))
    expect(fn).not.toBeCalled()
    jest.advanceTimersByTime(101)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('timeout should stop', () => {
    const fn = jest.fn()
    renderHook(() => useTimeout(fn, 100))
    expect(fn).not.toBeCalled()
    jest.advanceTimersByTime(50)
    expect(fn).toHaveBeenCalledTimes(0)
  })
})
