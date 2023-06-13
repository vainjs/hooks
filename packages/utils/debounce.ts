import type { Noop } from './type'

export interface DebounceOptions {
  immediate?: boolean
  wait?: number
}

export function debounce(fn: Noop, options: DebounceOptions = {}) {
  const { immediate, wait = 0 } = options
  let timer: NodeJS.Timeout | null

  return function (...args: unknown[]) {
    if (timer) clearTimeout(timer)

    if (immediate && !timer) {
      fn.apply(this, args)
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, wait)
  }
}
