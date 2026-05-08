export type ObjectKey = string | symbol

export type CallbackObject<T> = T extends object ? Partial<T> : never

export type CallbackArray<T> = T extends object ? [keyof T, T[keyof T]] : never

export type ArrayIterator<T, R = any> = (
  value: T,
  index: number,
  array: T[]
) => R

export type ObjectIterator<T, R = any> = (
  value: T,
  key: ObjectKey,
  object: Record<ObjectKey, T>
) => R

export type ArrayReduceIterator<T, R> = (
  accumulator: R,
  currentValue: T,
  currentIndex: number,
  array: T[]
) => R

export type ObjectReduceIterator<T, R> = (
  accumulator: R,
  currentValue: T,
  currentKey: ObjectKey,
  object: Record<ObjectKey, T>
) => R
