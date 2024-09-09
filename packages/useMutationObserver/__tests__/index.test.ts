import { renderHook } from '@testing-library/react'
import { useMutationObserver } from '..'

describe('useMutationObserver', () => {
  let target: HTMLDivElement

  beforeEach(() => {
    target = document.createElement('div')
    document.body.appendChild(target)
  })

  afterEach(() => {
    document.body.removeChild(target)
  })

  it('should create a MutationObserver and observe the target element', async () => {
    const fn = jest.fn()
    const { rerender } = renderHook(() => useMutationObserver(fn, () => target))
    target.append(document.createElement('div'))
    await rerender()
    expect(fn).toHaveBeenCalledTimes(1)
    target.append(document.createElement('div'))
    await rerender()
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
