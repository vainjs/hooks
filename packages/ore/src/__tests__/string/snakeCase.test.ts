import { snakeCase } from '../..'

describe('snakeCase', () => {
  it('should convert string to snake_case', () => {
    expect(snakeCase('helloWord')).toEqual('hello_word')
    expect(snakeCase('HelloWord')).toEqual('hello_word')
    expect(snakeCase('helloWord007')).toEqual('hello_word_007')
    expect(snakeCase('helloWORD')).toEqual('hello_word')
    expect(snakeCase(true as unknown as string)).toBe('true')
    expect(snakeCase(123 as unknown as string)).toBe('123')
    expect(snakeCase(Symbol('123') as unknown as string)).toBe('symbol_123')
    expect(snakeCase('')).toEqual('')
    expect(snakeCase(null!)).toBe('')
  })

  it('should handle strings with special characters', () => {
    expect(snakeCase('@@he@ll@oWord007')).toEqual('he_ll_o_word_007')
    expect(snakeCase('@007@@_ helloWord ')).toEqual('007_hello_word')
  })
})
