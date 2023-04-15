export function sleep(duration = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

export function isNumber(num: unknown) {
  return typeof num === 'number'
}
