import { acceptHMRUpdate, defineStore } from 'pinia'

interface IState {
  overlay: boolean
  drawer: boolean
  pageTitle: string
  disabled_repository_menu: boolean
}
export const useVariablesStore = defineStore('variables', {
  state: (): IState => ({
    overlay: false,
    drawer: false,
    pageTitle: '',
    disabled_repository_menu: false,
  }),
  actions: {
    toggle() {
      this.drawer = !this.drawer
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useVariablesStore, import.meta.hot))
