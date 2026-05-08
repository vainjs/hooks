import { tryit } from '../..'

describe('tryit', () => {
  it('should execute a function and return its value', () => {
    const result = tryit(() => 12)
    expect(result).toEqual([undefined, 12])
  })

  it('should execute a function and return its promise value', async () => {
    const result = await tryit(() => Promise.resolve(12))
    expect(result).toEqual([undefined, 12])
  })

  it('should catch an error thrown by a function', () => {
    const error = new Error('Test error')
    const result = tryit(() => {
      throw error
    })
    expect(result).toEqual([error, undefined])
  })

  it('should execute a promise and return its value', async () => {
    const result = await tryit(Promise.resolve(12))
    expect(result).toEqual([undefined, 12])
  })

  it('should catch an error thrown by a promise', async () => {
    const error = new Error('Test error')
    const result = await tryit(Promise.reject(error))
    expect(result).toEqual([error, undefined])
  })
})