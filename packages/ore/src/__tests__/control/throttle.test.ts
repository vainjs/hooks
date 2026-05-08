import { throttle, sleep } from '../..'

describe('throttle', () => {
  it('should call the function once at the beginning and once at the end if leading is true and trailing is true', async () => {
    const mockFn = jest.fn()
    const throttledFn = throttle(mockFn, 10, { leading: true, trailing: true })
    throttledFn()
    throttledFn()
    throttledFn()
    expect(mockFn).toHaveBeenCalledTimes(1)
    await sleep(10)
    expect(mockFn).toHaveBeenCalledTimes(2)
    throttledFn()
    throttledFn()
    throttledFn()
    expect(mockFn).toHaveBeenCalledTimes(2)
    await sleep(10)
    expect(mockFn).toHaveBeenCalledTimes(3)
    await sleep(10)
    throttledFn()
    throttledFn()
    throttledFn()
    expect(mockFn).toHaveBeenCalledTimes(4)
    await sleep(10)
    expect(mockFn).toHaveBeenCalledTimes(5)
    throttledFn()
    throttledFn()
    throttledFn()
    expect(mockFn).toHaveBeenCalledTimes(5)
  })

  it('should call the function only once immediately if leading is true and trailing is false', async () => {
    const mockFn = jest.fn()
    const throttledFn = throttle(mockFn, 10, {
      leading: true,
      trailing: false,
    })
    throttledFn()
    throttledFn()
    throttledFn()
    expect(mockFn).toHaveBeenCalledTimes(1)
    await sleep(10)
    expect(mockFn).toHaveBeenCalledTimes(1)
    throttledFn()
    throttledFn()
    throttledFn()
    expect(mockFn).toHaveBeenCalledTimes(2)
    await sleep(10)
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  it('should call the function only once at the end if leading is false and trailing is true', async () => {
    const mockFn = jest.fn()
    const throttledFn = throttle(mockFn, 10, {
      leading: false,
      trailing: true,
    })
    throttledFn()
    throttledFn()
    throttledFn()
    expect(mockFn).not.toHaveBeenCalled()
    await sleep(10)
    expect(mockFn).toHaveBeenCalledTimes(1)
    throttledFn()
    throttledFn()
    throttledFn()
    expect(mockFn).toHaveBeenCalledTimes(1)
    await sleep(10)
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  it('should not call the function at all if both leading and trailing are false', async () => {
    const mockFn = jest.fn()
    const throttledFn = throttle(mockFn, 10, {
      leading: false,
      trailing: false,
    })
    throttledFn()
    throttledFn()
    throttledFn()
    expect(mockFn).not.toHaveBeenCalled()
    await sleep(10)
    expect(mockFn).not.toHaveBeenCalled()
  })
})
