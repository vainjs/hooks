export type Noop = (...args: unknown[]) => unknown

export interface DebounceOptions {
  immediate?: boolean
  wait?: number
}

export function debounce(fn: Noop, options: DebounceOptions = {}) {
  const { immediate, wait = 300 } = options
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
