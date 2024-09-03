import { renderHook } from '@testing-library/react'
import { useClickAway } from '../index'

describe('useClickAway', () => {
  it('should invoke the callback when clicking away from the target', () => {
    const fn = jest.fn()
    const target = document.createElement('div')
    document.body.appendChild(target)
    renderHook(() => useClickAway(fn, target))
    document.body.click()
    expect(fn).toHaveBeenCalled()
  })

  it('should not invoke the callback when clicking on the target', () => {
    const fn = jest.fn()
    const target = document.createElement('div')
    document.body.appendChild(target)
    renderHook(() => useClickAway(fn, target))
    target.click()
    expect(fn).not.toHaveBeenCalled()
  })
})
