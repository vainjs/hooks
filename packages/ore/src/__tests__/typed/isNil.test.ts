import { isNil } from '../..'

describe('isNil', () => {
  it('should return true for nil', () => {
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
  })

  it('should return false for non-nil', () => {
    expect(isNil('abc')).toBe(false)
    expect(isNil(0)).toBe(false)
    expect(isNil({})).toBe(false)
  })
})