import { isNaN } from '../..'

describe('isNaN', () => {
  it('should return true for NaN', () => {
    expect(isNaN(NaN)).toBe(true)
    expect(isNaN(0 / 0)).toBe(true)
  })

  it('should return false for non-NaN', () => {
    expect(isNaN(1)).toBe(false)
    expect(isNaN(0)).toBe(false)
    expect(isNaN(-0)).toBe(false)
    expect(isNaN(Infinity)).toBe(false)
    expect(isNaN('abc')).toBe(false)
    expect(isNaN(null)).toBe(false)
    expect(isNaN({})).toBe(false)
  })
})