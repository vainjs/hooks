import { isString } from './typed'

function serializeString(str: unknown, split = ' ') {
  if (str == null) return ''
  const s = isString(str) ? str : String(str)
  return s
    .replace(/[\W_]+/g, split)
    .replace(/([a-z])([A-Z])/g, `$1${split}$2`)
    .toLowerCase()
    .replace(/([a-z])(\d)|(\d)([a-z])/g, `$1$3${split}$2$4`)
    .trim()
}

export function capitalize(str: string) {
  if (str == null) return ''
  const s = isString(str) ? str : String(str)
  return s.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())
}

export function snakeCase(str: string) {
  const serializedStr = serializeString(str)
  return serializedStr ? serializedStr.replace(/ /g, '_') : serializedStr
}

export function camelCase(str: string) {
  const serializedStr = serializeString(str)
  return serializedStr
    ? serializedStr.replace(/ (\w)/g, (_, p1) => p1.toUpperCase())
    : serializedStr
}

export function pascalCase(str: string) {
  const serializedStr = serializeString(str)
  return serializedStr
    ? ` ${serializedStr}`.replace(/ (\w)/g, (_, p1) => p1.toUpperCase())
    : serializedStr
}

export function kebabCase(str: string) {
  const serializedStr = serializeString(str)
  return serializedStr ? serializedStr.replace(/ /g, '-') : serializedStr
}
