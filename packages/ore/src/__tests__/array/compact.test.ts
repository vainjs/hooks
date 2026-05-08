import { compact } from '../..'

describe('compact', () => {
  it('should return an empty array when input is not an array', () => {
    expect(compact('not an array' as unknown as [])).toEqual([])
    expect(compact(undefined!)).toEqual([])
    expect(compact({} as [])).toEqual([])
    expect(compact(null!)).toEqual([])
  })

  it('should return a new array with only truthy values', () => {
    expect(compact([1, 2, '', null, undefined, 0, false])).toEqual([1, 2])
    expect(compact([true, false, 'compact', '', [], {}])).toEqual([
      true,
      'compact',
    ])
  })
})
