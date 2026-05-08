import { capitalize } from '../..'

describe('capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('hello world')).toBe('Hello world')
    expect(capitalize('hello WOrld')).toBe('Hello world')
    expect(capitalize('Hello')).toBe('Hello')
    expect(capitalize(true as unknown as string)).toBe('True')
    expect(capitalize(123 as unknown as string)).toBe('123')
    expect(capitalize(Symbol('123') as unknown as string)).toBe('Symbol(123)')
    expect(capitalize('')).toEqual('')
    expect(capitalize(null!)).toBe('')
  })

  it('should not capitalize non-letter first character', () => {
    expect(capitalize('@@he@ll@oWord007')).toBe('@@he@ll@oword007')
    expect(capitalize('@007@@_ helloWord ')).toEqual('@007@@_ helloword ')
  })
})
