import { isEmpty } from '../..'

describe('isEmpty', () => {
  it('should return true for empty values', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty(new Map())).toBe(true)
    expect(isEmpty(new Set())).toBe(true)
  })

  it('should return false for non-empty values', () => {
    expect(isEmpty('str')).toBe(false)
    expect(isEmpty([1])).toBe(false)
    expect(isEmpty({ key: 'value' })).toBe(false)
    expect(isEmpty(new Map([['k', 'v']]))).toBe(false)
    expect(isEmpty(new Set([1]))).toBe(false)
    expect(isEmpty(0)).toBe(false)
    expect(isEmpty(false)).toBe(false)
    expect(isEmpty(true)).toBe(false)
  })
})