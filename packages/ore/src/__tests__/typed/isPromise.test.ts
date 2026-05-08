import { isPromise } from '../..'

describe('isPromise', () => {
  it('should return true for Promise', () => {
    expect(isPromise(Promise.resolve(1))).toBe(true)
  })

  it('should return false for non-Promise', () => {
    expect(isPromise(null)).toBe(false)
    expect(isPromise(undefined)).toBe(false)
    expect(isPromise('Not a promise')).toBe(false)
    expect(isPromise({ then: 'not a function' })).toBe(false)
  })
})