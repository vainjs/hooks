import { useEffect, useState } from 'react'
import type { DebounceOptions } from '../utils/debounce'
import useDebounceFn from '../useDebounceFn'

function useDebounce<T>(value: T, options?: DebounceOptions) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  const { debounceFn } = useDebounceFn(() => {
    setDebouncedValue(value)
  }, options)

  useEffect(() => {
    debounceFn()
  }, [value])

  return debouncedValue
}

export default useDebounce
