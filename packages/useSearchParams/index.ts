import { useState, useEffect, useCallback } from 'react'

type Params = Record<string, string>

function useSearchParams<T extends Params = Params>(search?: string) {
  const [params, setParams] = useState({} as T)

  const getParams = useCallback(() => {
    const v = search || location.search
    let params = {} as T
    if (!v) return params
    const searchParams = new URLSearchParams(v)
    for (const [key, value] of searchParams) {
      if (value) {
        params = { ...params, [key]: value }
      }
    }
    return params
  }, [search])

  useEffect(() => {
    setParams(getParams())
  }, [getParams])

  return params
}

export default useSearchParams
