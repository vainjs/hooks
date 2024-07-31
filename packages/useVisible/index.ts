import { useCallback, useId, useMemo } from 'react'
import { useStore } from '../useStore'

export function useVisibleState(visible?: boolean, namespace?: string) {
  const [store, dispatch] = useStore()
  const visibleName = `${namespace || location.pathname}${useId()}`

  const setOpen = useCallback(
    (visible: boolean) => {
      dispatch(visibleName, visible)
    },
    [dispatch, visibleName]
  )

  return [store[visibleName] ?? visible, setOpen] as [
    boolean,
    (visible: boolean) => void,
  ]
}

/**
 * Is there a popup layer displayed in the current namespace
 */
export function useVisible(namespace?: string) {
  const [store] = useStore()
  const visibleNamePrefix = `${namespace || location.pathname}`

  return useMemo(
    () =>
      Object.keys(store).some(
        (k) => k.startsWith(visibleNamePrefix) && store[k]
      ),
    [store, visibleNamePrefix]
  )
}
