import { isPlainObject } from '../..'

describe('isPlainObject', () => {
  it('should return true for plain objects', () => {
    expect(isPlainObject({})).toBe(true)
    expect(isPlainObject(Object.create(null))).toBe(true)
    expect(isPlainObject(new Object())).toBe(true)
  })

  it('should return false for non-plain objects', () => {
    expect(isPlainObject([])).toBe(false)
    expect(isPlainObject(new Date())).toBe(false)
    expect(isPlainObject(new Boolean('abc'))).toBe(false)
    expect(isPlainObject(new String('abc'))).toBe(false)
    expect(isPlainObject(new Number('1'))).toBe(false)
    expect(isPlainObject(() => {})).toBe(false)
    expect(isPlainObject(null)).toBe(false)
    expect(isPlainObject(undefined)).toBe(false)
    expect(isPlainObject('string')).toBe(false)
    expect(isPlainObject(Symbol('abc'))).toBe(false)
  })

  it('should return false for objects with custom prototype', () => {
    function Foo() {
      this.bar = 'baz'
    }
    // @ts-ignore
    expect(isPlainObject(new Foo())).toBe(false)
    expect(isPlainObject(Object.create({}))).toBe(false)
  })
})