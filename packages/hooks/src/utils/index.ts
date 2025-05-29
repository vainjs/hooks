import type { DataItem } from './type'

export function getType(target: unknown) {
  if (target instanceof Map) return 'map'
  if (target instanceof Set) return 'set'
  if (target instanceof Date) return 'date'
  if (typeof target === 'object') return 'object'
  if (typeof target === 'boolean') return 'boolean'
  if (typeof target === 'number') return 'number'
  return 'string'
}

export function filterParams(params: DataItem) {
  params = { ...params }
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const v = params[key] ?? ''
      // delete '', undefined, null
      if (v === '') {
        delete params[key]
      } else if (typeof v === 'string') {
        params[key] = v.trim()
      }
    }
  }
  return params
}
