import { renderHook } from '@testing-library/react'
import { useEventListener } from '../index'

describe('useEventListener', () => {
  let target: HTMLDivElement

  beforeEach(() => {
    target = document.createElement('div')
    document.body.appendChild(target)
  })

  afterEach(() => {
    document.body.removeChild(target)
  })

  it('should add event listener when target element is available', () => {
    const fn = jest.fn()
    const { rerender, unmount } = renderHook(() =>
      useEventListener('click', fn, { target })
    )
    document.body.click()
    expect(fn).not.toHaveBeenCalled()
    target.click()
    expect(fn).toHaveBeenCalledTimes(1)
    rerender()
    target.click()
    expect(fn).toHaveBeenCalledTimes(2)
    unmount()
    target.click()
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should add event listener when target element is available and pass a signal parameter', () => {
    const fn = jest.fn()
    const controller = new AbortController()
    const { rerender, unmount } = renderHook(() =>
      useEventListener('click', fn, { target, signal: controller.signal })
    )
    document.body.click()
    expect(fn).not.toHaveBeenCalled()
    target.click()
    expect(fn).toHaveBeenCalledTimes(1)
    rerender()
    target.click()
    expect(fn).toHaveBeenCalledTimes(2)
    unmount()
    target.click()
    expect(fn).toHaveBeenCalledTimes(3)
    controller.abort()
    target.click()
    expect(fn).toHaveBeenCalledTimes(3)
  })
})
