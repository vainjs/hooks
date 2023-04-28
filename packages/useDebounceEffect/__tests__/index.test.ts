import { renderHook } from '@testing-library/react'
import { useState } from 'react'
import { sleep } from '../../utils'
import useDebounceEffect from '../index'

describe('useDebounceEffect', () => {
  it('useDebounceEffect should work', async () => {
    const fn = jest.fn()
    const hook = renderHook(() => {
      const [value, setValue] = useState(0)
      useDebounceEffect(fn, [value])
      return { setValue }
    })
    expect(fn).not.toBeCalled()

    hook.result.current.setValue(1)
    await sleep(100)
    expect(fn).not.toBeCalled()

    hook.result.current.setValue(2)
    await sleep(299)
    expect(fn).not.toBeCalled()

    hook.result.current.setValue(3)
    await sleep(301)
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
