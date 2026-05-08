export type DebounceOptions = {
  trailing?: boolean
  leading?: boolean
}

export function debounce<T extends unknown[]>(
  fn: (...args: T) => void,
  wait = 0,
  options?: DebounceOptions
) {
  const { leading = false, trailing = true } = options || {}
  let timer: NodeJS.Timeout | null

  return function (...args: T) {
    if (!leading && !trailing) return
    if (leading && !timer) {
      fn.apply(this, args)
    }
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      if (trailing) {
        fn.apply(this, args)
      }
      timer = null
    }, wait)
  }
}

export type ThrottleOptions = {
  trailing?: boolean
  leading?: boolean
}

export function throttle<T extends unknown[]>(
  fn: (...args: T) => void,
  wait = 0,
  options?: ThrottleOptions
) {
  const { leading = true, trailing = true } = options || {}
  let timer: NodeJS.Timeout | null
  let previous = 0

  return function (...args: T) {
    if (!leading && !trailing) return
    const now = Date.now()
    if (!leading && previous === 0) {
      previous = now
    }
    const remaining = Math.max(wait - (now - previous), 0)
    if (remaining <= 0) {
      fn.apply(this, args)
      previous = now
    } else if (trailing) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
        previous = Date.now()
        timer = null
      }, remaining)
    }
  }
}
