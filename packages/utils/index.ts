import type { DataItem } from './type'

export function sleep(duration = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

export function getPrimitiveType(target: unknown) {
  return Object.prototype.toString.call(target)
}

export function getType(target: unknown) {
  if (target instanceof Map) return 'map'
  if (target instanceof Set) return 'set'
  if (target instanceof Date) return 'date'
  if (typeof target === 'object') return 'object'
  if (typeof target === 'boolean') return 'boolean'
  if (typeof target === 'number') return 'number'
  return 'string'
}

export function isNumber(value: unknown) {
  return typeof value === 'number'
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}

export function isNil(value: unknown) {
  return value === undefined || value === null
}

export function snakeCase(str: string) {
  return String(str)
    .replace(/([A-Z]+)/g, (m, p) => ` ${p.toLowerCase()}`)
    .replace(/([\W_]+)/g, ' ')
    .trim()
    .split(' ')
    .join('_')
}

export function filterParams(params: DataItem) {
  params = { ...params }
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const v = params[key] ?? ''
      // delete '', undefined, null
      if (v === '') {
        delete params[key]
      } else if (typeof v === 'string') {
        params[key] = v.trim()
      }
    }
  }
  return params
}

/**
 * +0 === -0 and NaN === NaN
 */
export function sameValueZero(x: unknown, y: unknown) {
  if (typeof x === 'number' && typeof y === 'number') {
    // -0 and 0 or NaN and NaN
    return x === y || (x !== x && y !== y)
  }
  return x === y
}
