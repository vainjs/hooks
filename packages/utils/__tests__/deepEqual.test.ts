import deepEqual from '../deepEqual'

describe('deepEqual', () => {
  it('deepEqual should work with object', async () => {
    const target = { a: 1 }
    expect(deepEqual(target, target)).toBe(true)
    expect(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true)
    expect(deepEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false)
    expect(
      deepEqual(
        { a: 1, b: 2, c: [1, 2, { a: 1 }] },
        { a: 1, b: 2, c: [1, 2, { a: 1 }] }
      )
    ).toBe(true)
  })

  it('deepEqual should work with array', async () => {
    const target = [1, 2, 3]
    expect(deepEqual(target, target)).toBe(true)
    expect(deepEqual([1, 2, 3], [1, 3, 2])).toBe(false)
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true)
  })

  it('deepEqual should work with number', async () => {
    expect(deepEqual(1, 1)).toBe(true)
    expect(deepEqual(1, 2)).toBe(false)
    expect(deepEqual(1, new Number(1))).toBe(false)
    expect(deepEqual(1, new Number('1'))).toBe(false)
    expect(deepEqual(new Number('1'), new Number('1'))).toBe(true)
    expect(deepEqual(NaN, NaN)).toBe(true)
    expect(deepEqual(+0, -0)).toBe(true)
  })

  it('deepEqual should work with bigint', async () => {
    expect(deepEqual(BigInt(1n), BigInt(1n))).toBe(true)
    expect(deepEqual(1n, BigInt(1n))).toBe(true)
    expect(deepEqual(1n, 1n)).toBe(true)
    expect(deepEqual(1n, 2n)).toBe(false)
  })

  it('deepEqual should work with boolean', async () => {
    expect(deepEqual(true, false)).toBe(false)
    expect(deepEqual(true, new Boolean(true))).toBe(false)
    expect(deepEqual(new Boolean(true), new Boolean(true))).toBe(true)
  })

  it('deepEqual should work with string', async () => {
    expect(deepEqual('1', '1')).toBe(true)
    expect(deepEqual('1', new String('1'))).toBe(false)
    expect(deepEqual(new String('1'), new String('1'))).toBe(true)
  })

  it('deepEqual should work with symbol', async () => {
    expect(deepEqual(Symbol('a'), Symbol('a'))).toBe(false)
    expect(deepEqual(Symbol('a'), Symbol('b'))).toBe(false)
  })

  it('deepEqual should work with nil', async () => {
    expect(deepEqual(null, undefined)).toBe(false)
    expect(deepEqual(null, null)).toBe(true)
    expect(deepEqual(undefined, undefined)).toBe(true)
  })

  it('deepEqual should work with Date', async () => {
    expect(deepEqual(new Date('2023-07-04'), new Date('2023-07-04'))).toBe(true)
    expect(deepEqual(new Date('2023-07-04'), new Date('2023-07-05'))).toBe(
      false
    )
  })

  it('deepEqual should work with Error', async () => {
    expect(deepEqual(new Error('error'), new Error('error'))).toBe(true)
    expect(deepEqual(new Error('error'), new Error('error2'))).toBe(false)
  })

  it('deepEqual should work with RegExp', async () => {
    expect(
      deepEqual(new RegExp('[abc]+', 'g'), new RegExp('[abc]+', 'g'))
    ).toBe(true)
    expect(deepEqual(new RegExp('[abc]+', 'g'), new RegExp('[abc]+'))).toBe(
      false
    )
    expect(deepEqual(/[abc]+/g, /[abc]+/g)).toBe(true)
    expect(deepEqual(/[abc]+/g, /[abc]+/)).toBe(false)
  })
})
