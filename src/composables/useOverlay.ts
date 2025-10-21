import { useVariablesStore } from '~/stores/variables'

export function useOverlay(value: boolean) {
  const store = useVariablesStore()
  store.overlay = value
}
export function getOverlay(): boolean {
  const store = useVariablesStore()
  return store.overlay
}
