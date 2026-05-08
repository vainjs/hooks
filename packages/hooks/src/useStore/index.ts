import { useSyncExternalStore } from 'react'

type Dispatch = (key: string, value: any) => void
type State = Record<string, any>
type Listener = () => void

export function createStore(namespace?: string) {
  const listeners = new Set<Listener>()
  let state: State = {}

  const subscribe = (listener: Listener) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }

  const getSnapshot = () => state

  const dispatch: Dispatch = (key: string, value: any) => {
    const actualKey = `${namespace ?? ''}${key}`
    if (state[actualKey] === value) return
    state = { ...state, [actualKey]: value }
    listeners.forEach((listener) => listener())
  }

  return { subscribe, getSnapshot, dispatch }
}

const currentStore = createStore()

export function useDispatch() {
  return currentStore.dispatch
}

export function useStore(): [State, Dispatch] {
  const { subscribe, getSnapshot } = currentStore
  const dispatch = useDispatch()
  return [useSyncExternalStore(subscribe, getSnapshot), dispatch]
}
