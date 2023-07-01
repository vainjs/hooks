import { getPrimitiveType, sameValueZero } from './index'

function deepEqual(target: any, other: any): boolean {
  const targetType = getPrimitiveType(target)
  const otherType = getPrimitiveType(other)
  if (targetType !== otherType) return false
  /**
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#comparing_equality_methods
   *
   * shallow compare basic type: boolean, number, string, null, undefined, bigint, symbol
   * shallow compare reference type:
   * const target = { a: 1 }
   * deepEqual(target, target) // true
   */
  if (sameValueZero(target, other)) return true

  switch (targetType) {
    case '[object Boolean]':
    case '[object String]':
    case '[object Number]':
      // both are `new Primitive()`s
      if (typeof target === 'object' && typeof other === 'object') {
        return sameValueZero(target.valueOf(), other.valueOf())
      } else {
        return sameValueZero(target, other)
      }
    case '[object Date]':
      return +target == +other
    case '[object Error]':
      return target.message == other.message
    case '[object RegExp]':
      return target.source === other.source && target.flags === other.flags
  }

  if (targetType === '[object Object]') {
    const targetKeys = Object.keys(target)
    const otherKeys = Object.keys(other)
    if (targetKeys.length !== otherKeys.length) return false
    let n = targetKeys.length - 1

    while (n >= 0) {
      // ignore the order: deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 }) // true
      const key = targetKeys[n]
      if (!deepEqual(target[key], other[key])) return false
      n--
    }
    return true
  }

  if (targetType === '[object Array]') {
    if (target.length !== other.length) return false
    let n = target.length - 1
    while (n >= 0) {
      if (!deepEqual(target[n], other[n])) return false
      n--
    }
    return true
  }

  return false
}

export default deepEqual
