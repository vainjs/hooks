import { isFunction, isPromise } from './typed'

export function sleep(milliseconds = 0) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

type TryitResult<T> =
  T extends Promise<any>
    ? Promise<[any, undefined] | [undefined, Awaited<T>]>
    : [any, undefined] | [undefined, T]

export function tryit<T>(fn: T | (() => T)): TryitResult<T> {
  try {
    const handle = isFunction(fn) ? fn() : fn
    if (isPromise(handle)) {
      return handle
        .then((data) => [undefined, data])
        .catch((error) => [error, undefined]) as TryitResult<T>
    }
    return [undefined, handle] as TryitResult<T>
  } catch (error) {
    return [error, undefined] as TryitResult<T>
  }
}
