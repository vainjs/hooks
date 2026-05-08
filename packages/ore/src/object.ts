import { isEmpty } from './typed'

export const get = <T extends object, D>(
  value: T,
  path: string,
  defaultValue?: D
) => {
  if (isEmpty(value)) return defaultValue as D
  if (!path) return
  const paths = path.split(/[\.\[\]]/g)
  let current: any = value
  for (const key of paths) {
    if (key === '') continue
    if (current == null || !Reflect.has(current, key)) return defaultValue as D
    current = current[key]
  }
  return current
}
