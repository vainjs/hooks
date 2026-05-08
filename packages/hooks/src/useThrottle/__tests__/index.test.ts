import { act, renderHook } from '@testing-library/react'
import { sleep } from '@vainjs/ore'
import { useThrottle } from '../index'

describe('useThrottle', () => {
  it('should call the function once at the beginning and once at the end if leading is true and trailing is true', async () => {
    const { result, rerender } = renderHook(
      ({ state }) => useThrottle(state, 10, { leading: true, trailing: true }),
      {
        initialProps: { state: 0 },
      }
    )
    expect(result.current).toBe(0)
    rerender({ state: 1 })
    rerender({ state: 2 })
    rerender({ state: 3 })
    expect(result.current).toBe(0)
    await act(async () => {
      await sleep(10)
    })
    expect(result.current).toBe(3)
    rerender({ state: 4 })
    rerender({ state: 5 })
    rerender({ state: 6 })
    expect(result.current).toBe(3)
    await act(async () => {
      await sleep(10)
    })
    expect(result.current).toBe(6)
  })

  it('should call the function only once immediately if leading is true and trailing is false', async () => {
    const { result, rerender } = renderHook(
      ({ state }) => useThrottle(state, 10, { leading: true, trailing: false }),
      {
        initialProps: { state: 0 },
      }
    )
    expect(result.current).toBe(0)
    rerender({ state: 1 })
    rerender({ state: 2 })
    expect(result.current).toBe(0)
    await act(async () => {
      await sleep(10)
    })
    expect(result.current).toBe(0)
    rerender({ state: 3 })
    rerender({ state: 4 })
    expect(result.current).toBe(3)
    await act(async () => {
      await sleep(10)
    })
    expect(result.current).toBe(3)
  })

  it('should call the function only once at the end if leading is false and trailing is true', async () => {
    const { result, rerender } = renderHook(
      ({ state }) => useThrottle(state, 10, { leading: false, trailing: true }),
      {
        initialProps: { state: 0 },
      }
    )
    expect(result.current).toBe(0)
    rerender({ state: 1 })
    rerender({ state: 2 })
    expect(result.current).toBe(0)
    await act(async () => {
      await sleep(10)
    })
    expect(result.current).toBe(2)
    rerender({ state: 3 })
    rerender({ state: 4 })
    expect(result.current).toBe(2)
    await act(async () => {
      await sleep(10)
    })
    expect(result.current).toBe(4)
  })
})
