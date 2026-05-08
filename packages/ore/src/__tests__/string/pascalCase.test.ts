import { pascalCase } from '../..'

describe('pascalCase', () => {
  it('should convert string to pascalCase', () => {
    expect(pascalCase('helloWord')).toEqual('HelloWord')
    expect(pascalCase('HelloWord')).toEqual('HelloWord')
    expect(pascalCase('helloWord007')).toEqual('HelloWord007')
    expect(pascalCase('helloWORD')).toEqual('HelloWord')
    expect(pascalCase(true as unknown as string)).toBe('True')
    expect(pascalCase(123 as unknown as string)).toBe('123')
    expect(pascalCase(Symbol('123') as unknown as string)).toBe('Symbol123')
    expect(pascalCase('')).toEqual('')
    expect(pascalCase(null!)).toBe('')
  })

  it('should handle strings with special characters', () => {
    expect(pascalCase('@@he@ll@oWord007')).toEqual('HeLlOWord007')
    expect(pascalCase('@007@@_ helloWord ')).toEqual('007HelloWord')
  })
})
