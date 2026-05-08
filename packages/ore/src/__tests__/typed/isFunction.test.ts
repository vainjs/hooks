import { isFunction } from '../..'

describe('isFunction', () => {
  it('should return true for functions', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(function a() {})).toBe(true)
  })

  it('should return false for non-functions', () => {
    expect(isFunction('not a function')).toBe(false)
    expect(isFunction({})).toBe(false)
    expect(isFunction(null)).toBe(false)
  })
})