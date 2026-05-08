import { isInt } from '../..'

describe('isInt', () => {
  it('should return true for integers', () => {
    expect(isInt(10)).toBe(true)
    expect(isInt(-5)).toBe(true)
    expect(isInt(0)).toBe(true)
  })

  it('should return false for non-integers', () => {
    expect(isInt(10.5)).toBe(false)
    expect(isInt(3.14)).toBe(false)
    expect(isInt('10')).toBe(false)
    expect(isInt(true)).toBe(false)
    expect(isInt(null)).toBe(false)
    expect(isInt({})).toBe(false)
  })
})