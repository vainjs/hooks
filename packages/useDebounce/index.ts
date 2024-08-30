import type { DebounceOptions } from '@vainjs/ore'
import { useEffect, useState } from 'react'
import { useDebounceFn } from '../useDebounceFn'

export function useDebounce<T>(value: T, wait = 0, options?: DebounceOptions) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const debouncedFn = useDebounceFn(
    () => {
      setDebouncedValue(value)
    },
    wait,
    options
  )

  useEffect(() => {
    debouncedFn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return debouncedValue
}
