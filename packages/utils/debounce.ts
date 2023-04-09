export interface DebounceOptions {
  immediate: boolean
  wait?: number
}

export function debounce(fn: Function, wait: number = 0, immediate = false) {
  let timer: NodeJS.Timeout | null

  return function (...args: any[]) {
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
