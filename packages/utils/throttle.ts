import type { Noop } from './type'

export interface ThrottleOptions {
  wait?: number
}

export function throttle(fn: Noop, options: ThrottleOptions = {}) {
  const { wait = 0 } = options
  let timer: NodeJS.Timeout | null
  let previous = 0

  return function (...args: unknown[]) {
    const now = Date.now()
    const remaining = wait - (now - previous)
    if (remaining <= 0) {
      fn.apply(this, args)
      previous = now
    } else {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
        previous = now
        timer = null
      }, remaining)
    }
  }
}
