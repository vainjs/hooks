import { camelCase } from '../..'

describe('camelCase', () => {
  it('should convert string to camelCase', () => {
    expect(camelCase('helloWord')).toEqual('helloWord')
    expect(camelCase('HelloWord')).toEqual('helloWord')
    expect(camelCase('helloWord007')).toEqual('helloWord007')
    expect(camelCase('helloWORD')).toEqual('helloWord')
    expect(camelCase(true as unknown as string)).toBe('true')
    expect(camelCase(123 as unknown as string)).toBe('123')
    expect(camelCase(Symbol('123') as unknown as string)).toBe('symbol123')
    expect(camelCase('')).toEqual('')
    expect(camelCase(null!)).toBe('')
  })

  it('should handle strings with special characters', () => {
    expect(camelCase('@@he@ll@oWord007')).toEqual('heLlOWord007')
    expect(camelCase('@007@@_ helloWord ')).toEqual('007HelloWord')
  })
})
