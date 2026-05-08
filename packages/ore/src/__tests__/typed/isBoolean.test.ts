import { isBoolean } from '../..'

describe('isBoolean', () => {
  it('should return true for boolean', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
    expect(isBoolean(new Boolean('1'))).toBe(true)
  })

  it('should return false for non-boolean', () => {
    expect(isBoolean('abc')).toBe(false)
    expect(isBoolean(null)).toBe(false)
    expect(isBoolean({})).toBe(false)
    expect(isBoolean(1)).toBe(false)
  })
})