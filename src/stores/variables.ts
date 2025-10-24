import { acceptHMRUpdate, defineStore } from 'pinia'

interface IState {
  overlay: boolean
  drawer: boolean
  pageTitle: string
  disabled_repository_menu: boolean
  user: any
}
export const useVariablesStore = defineStore('variables', {
  state: (): IState => ({
    overlay: false,
    drawer: false,
    pageTitle: '',
    disabled_repository_menu: false,
    user: null,
  }),
  actions: {
    toggle() {
      this.drawer = !this.drawer
    },
    setUser(userData: any) {
      this.user = userData
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useVariablesStore, import.meta.hot))
