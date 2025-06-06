import { act, renderHook } from '@testing-library/react'
import { useState } from 'react'
import { useDeepCompareMemo } from '../index'

describe('useDeepCompareMemo', () => {
  it('useDeepCompareMemo should work', async () => {
    const hook = renderHook(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [value, setValue] = useState<any>(0)
      const memoValue = useDeepCompareMemo(() => value, [value])
      return { memoValue, setValue }
    })
    expect(hook.result.current.memoValue).toBe(0)

    const state = { a: 1, b: 2 }
    await act(async () => {
      hook.result.current.setValue(state)
    })
    expect(hook.result.current.memoValue).toBe(state)

    await act(async () => {
      hook.result.current.setValue({ b: 2, a: 1 })
    })
    expect(hook.result.current.memoValue).toBe(state)

    const state2 = { a: 1 }
    await act(async () => {
      hook.result.current.setValue(state2)
    })
    expect(hook.result.current.memoValue).toBe(state2)
  })
})
