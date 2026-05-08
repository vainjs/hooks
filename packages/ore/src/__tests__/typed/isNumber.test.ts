import { isNumber } from '../..'

describe('isNumber', () => {
  it('should return true for number', () => {
    expect(isNumber(1)).toBe(true)
    expect(isNumber(0)).toBe(true)
    expect(isNumber(new Number('1'))).toBe(true)
  })

  it('should return false for non-number', () => {
    expect(isNumber('abc')).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber({})).toBe(false)
  })
})