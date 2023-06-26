import { act, renderHook } from '@testing-library/react'
import useSessionStorage from '../index'

describe('useSessionStorage', () => {
  it('useSessionStorage support string', async () => {
    const { result, rerender } = renderHook(
      ({ state }) => {
        const [value, setValue] = useSessionStorage('string', state)
        return { value, setValue }
      },
      {
        initialProps: { state: 'string' },
      }
    )
    expect(result.current.value).toBe('string')

    rerender({ state: 'rerender' })
    expect(result.current.value).toBe('string')

    act(() => {
      result.current.setValue('update value')
    })
    expect(result.current.value).toBe('update value')
  })

  it('useSessionStorage support boolean', async () => {
    const { result, rerender } = renderHook(
      ({ state }) => {
        const [value, setValue] = useSessionStorage('boolean', state)
        return { value, setValue }
      },
      {
        initialProps: { state: true },
      }
    )
    expect(result.current.value).toBe(true)

    rerender({ state: false })
    expect(result.current.value).toBe(true)

    act(() => {
      result.current.setValue(false)
    })
    expect(result.current.value).toBe(false)
  })

  it('useSessionStorage support number', async () => {
    const { result, rerender } = renderHook(
      ({ state }) => {
        const [value, setValue] = useSessionStorage('number', state)
        return { value, setValue }
      },
      {
        initialProps: { state: 1 },
      }
    )
    expect(result.current.value).toBe(1)

    rerender({ state: 2 })
    expect(result.current.value).toBe(1)

    act(() => {
      result.current.setValue(2)
    })
    expect(result.current.value).toBe(2)
  })

  it('useSessionStorage support map', async () => {
    const { result, rerender } = renderHook(
      ({ state }) => {
        const [value, setValue] = useSessionStorage('map', state)
        return { value, setValue }
      },
      {
        initialProps: { state: new Map([['age', 1]]) },
      }
    )
    expect(result.current.value).toEqual(new Map([['age', 1]]))

    rerender({ state: new Map([['age', 2]]) })
    expect(result.current.value).toEqual(new Map([['age', 1]]))

    act(() => {
      result.current.setValue(new Map([['age', 2]]))
    })
    expect(result.current.value).toEqual(new Map([['age', 2]]))
  })

  it('useSessionStorage support set', async () => {
    const { result, rerender } = renderHook(
      ({ state }) => {
        const [value, setValue] = useSessionStorage('set', state)
        return { value, setValue }
      },
      {
        initialProps: { state: new Set([1, 2, 3]) },
      }
    )
    expect(result.current.value).toEqual(new Set([1, 2, 3]))

    rerender({ state: new Set([1, 2, 3, 4]) })
    expect(result.current.value).toEqual(new Set([1, 2, 3]))

    act(() => {
      result.current.setValue(new Set([1, 2, 3, 4]))
    })
    expect(result.current.value).toEqual(new Set([1, 2, 3, 4]))
  })

  it('useSessionStorage support date', async () => {
    const { result, rerender } = renderHook(
      ({ state }) => {
        const [value, setValue] = useSessionStorage('date', state)
        return { value, setValue }
      },
      {
        initialProps: { state: new Date('2023-06-26') },
      }
    )
    expect(result.current.value).toEqual(new Date('2023-06-26'))

    rerender({ state: new Date('2023-06-27') })
    expect(result.current.value).toEqual(new Date('2023-06-26'))

    act(() => {
      result.current.setValue(new Date('2023-06-27'))
    })
    expect(result.current.value).toEqual(new Date('2023-06-27'))
  })

  it('useSessionStorage support object', async () => {
    const { result, rerender } = renderHook(
      ({ state }) => {
        const [value, setValue] = useSessionStorage('object', state)
        return { value, setValue }
      },
      {
        initialProps: { state: { age: 1 } },
      }
    )
    expect(result.current.value).toEqual({ age: 1 })

    rerender({ state: { age: 2 } })
    expect(result.current.value).toEqual({ age: 1 })

    act(() => {
      result.current.setValue({ age: 2 })
    })
    expect(result.current.value).toEqual({ age: 2 })
  })

  it('useSessionStorage get key work', async () => {
    const { result } = renderHook(
      ({ state }) => {
        const [value, setValue] = useSessionStorage('object', state)
        return { value, setValue }
      },
      {
        initialProps: { state: { age: 3 } },
      }
    )
    expect(result.current.value).toEqual({ age: 2 })

    act(() => {
      result.current.setValue({ age: 4 })
    })
    expect(result.current.value).toEqual({ age: 4 })
  })
})
