import { isString } from '../..'

describe('isString', () => {
  it('should return true for string', () => {
    expect(isString('string')).toBe(true)
    expect(isString(new String(1))).toBe(true)
  })

  it('should return false for non-string', () => {
    expect(isString(null)).toBe(false)
    expect(isString(undefined)).toBe(false)
    expect(isString(123)).toBe(false)
    expect(isString({})).toBe(false)
  })
})