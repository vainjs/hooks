import { getPrimitiveType } from './index'

const OBJECT_TYPE = '[object Object]'
const ARRAY_TYPE = '[object Array]'
const REF_TYPES = [OBJECT_TYPE, ARRAY_TYPE]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepEqual(target: any, other: any): boolean {
  const targetType = getPrimitiveType(target)
  const otherType = getPrimitiveType(other)
  if (targetType !== otherType) return false

  if (!REF_TYPES.includes(targetType)) return Object.is(target, other)

  if (targetType === OBJECT_TYPE) {
    const targetKeys = Object.keys(target)
    const otherKeys = Object.keys(other)
    if (targetKeys.length !== otherKeys.length) return false
    let n = targetKeys.length - 1

    while (n >= 0) {
      if (!deepEqual(target[targetKeys[n]], other[targetKeys[n]])) return false
      n--
    }
    return true
  }

  if (targetType === ARRAY_TYPE) {
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
