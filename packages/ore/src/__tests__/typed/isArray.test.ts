import { isArray } from '../..'

describe('isArray', () => {
  it('should return true for array', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
  })

  it('should return false for non-array', () => {
    expect(isArray(null)).toBe(false)
    expect(isArray(undefined)).toBe(false)
    expect(isArray(123)).toBe(false)
    expect(isArray('abc')).toBe(false)
    expect(isArray({})).toBe(false)
    expect(isArray(() => {})).toBe(false)
  })
})