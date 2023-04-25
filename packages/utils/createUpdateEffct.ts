import {
  useLayoutEffect,
  EffectCallback,
  DependencyList,
  useEffect,
  useRef,
} from 'react'

export const createUpdateEffct =
  (hook: typeof useEffect | typeof useLayoutEffect) =>
  (fn: EffectCallback, deps: DependencyList) => {
    const isMounted = useRef(false)
    const fnRef = useRef(fn)

    hook(
      () => () => {
        isMounted.current = false
      },
      []
    )

    hook(() => {
      if (isMounted.current) {
        return fnRef.current()
      } else {
        isMounted.current = true
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
  }
