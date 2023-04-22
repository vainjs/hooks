import { act, renderHook } from '@testing-library/react'
import { useState } from 'react'
import useDeepCompareMemoize from '../index'

describe('useDeepCompareMemoize', () => {
  it('useDeepCompareMemoize should work', async () => {
    const hook = renderHook(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [value, setValue] = useState<any>(0)
      const memoizeValue = useDeepCompareMemoize(value)
      return { memoizeValue, setValue }
    })
    expect(hook.result.current.memoizeValue).toBe(0)

    const state = { a: 1, b: 2 }
    await act(async () => {
      hook.result.current.setValue(state)
    })
    expect(hook.result.current.memoizeValue).toBe(state)

    await act(async () => {
      hook.result.current.setValue({ b: 2, a: 1 })
    })
    expect(hook.result.current.memoizeValue).toBe(state)

    const state2 = { a: 1 }
    await act(async () => {
      hook.result.current.setValue(state2)
    })
    expect(hook.result.current.memoizeValue).toBe(state2)
  })
})
