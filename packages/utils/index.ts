export function sleep(duration = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

export function isNumber(num: unknown) {
  return typeof num === 'number'
}

export function getType(target: unknown) {
  return Object.prototype.toString.call(target)
}

export function isNil(value: unknown) {
  return value === undefined || value === null
}
