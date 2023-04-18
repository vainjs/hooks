import { act, renderHook } from '@testing-library/react'
import { sleep } from '../../utils'
import useThrottle from '../index'

describe('useThrottle', () => {
  it('useDebounce should work', async () => {
    const { result, rerender } = renderHook(
      ({ state }) => useThrottle(state, { wait: 300 }),
      {
        initialProps: { state: 0 },
      }
    )
    expect(result.current).toBe(0)

    rerender({ state: 1 })
    await sleep(100)
    expect(result.current).toBe(0)

    rerender({ state: 2 })
    await act(async () => {
      await sleep(201)
    })
    expect(result.current).toBe(2)
  })
})
