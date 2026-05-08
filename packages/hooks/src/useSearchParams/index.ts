import { useCallback, useMemo, useState } from 'react'

export function useSearchParams<T extends Record<string, string>>(
  search?: string
): [T, () => void] {
  const [signal, setSignal] = useState(0)

  const params = useMemo(() => {
    const v = search || window.location.search
    let params = {} as T
    if (!v) return params
    const searchParams = new URLSearchParams(v)
    for (const [key, value] of searchParams) {
      if (value) {
        params = { ...params, [key]: value }
      }
    }
    return params
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signal])

  const update = useCallback(() => {
    setSignal((prev) => prev + 1)
  }, [])

  return [params, update]
}
