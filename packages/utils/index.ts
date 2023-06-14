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
