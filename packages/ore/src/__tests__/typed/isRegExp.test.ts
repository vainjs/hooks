import { isRegExp } from '../..'

describe('isRegExp', () => {
  it('should return true for RegExp', () => {
    expect(isRegExp(/abc/)).toBe(true)
    expect(isRegExp(new RegExp('abc'))).toBe(true)
  })

  it('should return false for non-RegExp', () => {
    expect(isRegExp('abc')).toBe(false)
    expect(isRegExp(null)).toBe(false)
    expect(isRegExp(undefined)).toBe(false)
  })
})