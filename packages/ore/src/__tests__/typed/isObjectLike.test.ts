import { isObjectLike } from '../..'

describe('isObjectLike', () => {
  it('should return true for object-like values', () => {
    expect(isObjectLike({})).toBe(true)
    expect(isObjectLike([])).toBe(true)
    expect(isObjectLike(new Date())).toBe(true)
    expect(isObjectLike(/abc/)).toBe(true)
    expect(isObjectLike(new String('abc'))).toBe(true)
  })

  it('should return false for primitives', () => {
    expect(isObjectLike(null)).toBe(false)
    expect(isObjectLike(undefined)).toBe(false)
    expect(isObjectLike(Symbol('foo'))).toBe(false)
    expect(isObjectLike(BigInt(1n))).toBe(false)
    expect(isObjectLike(() => {})).toBe(false)
    expect(isObjectLike(true)).toBe(false)
    expect(isObjectLike(123)).toBe(false)
    expect(isObjectLike('')).toBe(false)
  })
})