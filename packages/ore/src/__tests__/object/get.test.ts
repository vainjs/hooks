import { get } from '../..'

describe('get', () => {
  it('should return the value at the specified path', () => {
    expect(get({ a: [{ b: { c: 'c' } }, 2, 3] }, 'a[0].b.c')).toBe('c')
    expect(get({ a: { b: { c: 'c' } } }, 'a.b.c')).toBe('c')
    expect(get({ a: [1, 2, 3] }, 'a[1]')).toBe(2)
    expect(get({ a: [1, 2, 3] }, 'a.1')).toBe(2)
    expect(
      get(
        {
          a: [
            [1, 2],
            [3, 4],
          ],
        },
        'a[0][1]'
      )
    ).toBe(2)
    expect(get({ a: 'a' }, 'a')).toBe('a')
    expect(get({ a: { b: { c: 'c' } } }, 'a[b][c]')).toBe('c')
  })

  it('should return undefined or default for invalid source', () => {
    expect(get(null as any, 'a')).toBeUndefined()
    expect(get(undefined as any, 'a')).toBeUndefined()
    expect(get(null as any, 'a', 0)).toBe(0)
    expect(get({ a: null }, 'a', 'default')).toBe(null)
  })

  it('should return default when path does not exist', () => {
    expect(get({}, 'a', 0)).toBe(0)
    expect(get({ a: 'a' }, 'b', 0)).toBe(0)
    expect(get({ a: 'a' }, 'b')).toBeUndefined()
    expect(get([1, 2, 3], 'a[10]')).toBeUndefined()
  })
})
