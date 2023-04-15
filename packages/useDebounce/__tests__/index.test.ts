import { act, renderHook } from '@testing-library/react'
import { sleep } from '../../utils'
import useDebounce from '../index'

describe('useDebounce', () => {
  it('useDebounce wait 300ms', async () => {
    const { result, rerender } = renderHook(
      ({ state }) => useDebounce(state, { wait: 300 }),
      {
        initialProps: { state: 0 },
      }
    )
    expect(result.current).toBe(0)

    rerender({ state: 1 })
    await sleep(100)
    expect(result.current).toBe(0)

    rerender({ state: 2 })
    await sleep(299)
    expect(result.current).toBe(0)

    rerender({ state: 3 })
    await act(async () => {
      await sleep(301)
    })
    expect(result.current).toBe(3)
  })
})
