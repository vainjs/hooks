import { renderHook } from '@testing-library/react'
import { sleep } from '../../utils/index'
import useDebounce from '../index'

describe('useDebounce', () => {
  it('useDebounce wait 200ms', async () => {
    const { result, rerender } = renderHook(({ state }) => useDebounce(state, { wait: 200 }), {
      initialProps: { state: 0 },
    })
    expect(result.current).toBe(0)

    rerender({ state: 1 })
    await sleep(100)
    expect(result.current).toBe(0)

    rerender({ state: 2 })
    await sleep(199)
    expect(result.current).toBe(0)

    rerender({ state: 3 })
    await sleep(210)
    expect(result.current).toBe(3)
  })
})
