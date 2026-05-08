import { kebabCase } from '../..'

describe('kebabCase', () => {
  it('should convert string to kebab-case', () => {
    expect(kebabCase('helloWord')).toEqual('hello-word')
    expect(kebabCase('HelloWord')).toEqual('hello-word')
    expect(kebabCase('helloWord007')).toEqual('hello-word-007')
    expect(kebabCase('helloWORD')).toEqual('hello-word')
    expect(kebabCase(true as unknown as string)).toBe('true')
    expect(kebabCase(123 as unknown as string)).toBe('123')
    expect(kebabCase(Symbol('123') as unknown as string)).toBe('symbol-123')
    expect(kebabCase('')).toEqual('')
    expect(kebabCase(null!)).toBe('')
  })

  it('should handle strings with special characters', () => {
    expect(kebabCase('@@he@ll@oWord007')).toEqual('he-ll-o-word-007')
    expect(kebabCase('@007@@_ helloWord ')).toEqual('007-hello-word')
  })
})
