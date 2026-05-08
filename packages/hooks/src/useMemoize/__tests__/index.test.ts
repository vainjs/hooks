import { act, renderHook } from '@testing-library/react'
import { useState } from 'react'
import { useMemoize } from '../index'

describe('useMemoize', () => {
  it('useMemoize should work with number', async () => {
    const hook = renderHook(() => {
      const [value, setValue] = useState(0)
      const memoizeValue = useMemoize(value)
      return { memoizeValue, setValue }
    })
    expect(hook.result.current.memoizeValue).toBe(0)

    await act(async () => {
      hook.result.current.setValue(1)
    })
    expect(hook.result.current.memoizeValue).toBe(0)

    await act(async () => {
      hook.result.current.setValue(2)
    })
    expect(hook.result.current.memoizeValue).toBe(0)
  })

  it('useMemoize should work with object', async () => {
    const state = { a: 1 }
    const hook = renderHook(() => {
      const [value, setValue] = useState(state)
      const memoizeValue = useMemoize(value)
      return { memoizeValue, setValue }
    })
    expect(hook.result.current.memoizeValue).toBe(state)

    await act(async () => {
      hook.result.current.setValue({ a: 2 })
    })
    expect(hook.result.current.memoizeValue).toBe(state)

    await act(async () => {
      hook.result.current.setValue({ a: 3 })
    })
    expect(hook.result.current.memoizeValue).toBe(state)
  })
})
