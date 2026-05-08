import { isArray, isEmpty } from './typed'

export function compact<T>(value: T[]) {
  if (!isArray(value)) return []
  return value.filter((v) => Boolean(v) && !isEmpty(v))
}
