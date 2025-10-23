import type { ISheetRow } from '~/types'
import { acceptHMRUpdate, defineStore } from 'pinia'

interface IState {
  search: string
  data: ISheetRow[]
  originalData: ISheetRow[]
  selectedFirm: string | null
  count: number

}

export const useProducts = defineStore('products-store', {
  state: (): IState => ({
    search: '',
    data: [],
    originalData: [],
    selectedFirm: null,
    count: 0,
  }),
  actions: {
    loadData(key: string) {
      this.data = []
      this.originalData = []
      const loadedData = useLoadData(key)
      this.data = loadedData
      this.originalData = loadedData // Save original data
    },

    searchProduct() {
      if (this.search.trim()) {
        const searchTerm = this.search.trim().toLowerCase()
        this.data = this.originalData.filter((el: ISheetRow) =>
          el.name.toLowerCase().includes(searchTerm),
        )
      }
      else {
        this.data = [...this.originalData] // Reset to original data
      }
      this.applyFirmFilter() // Re-apply firm filter after search
    },

    applyFirmFilter() {
      let filtered = [...this.originalData]

      // Apply search filter first
      if (this.search.trim()) {
        const searchTerm = this.search.trim().toLowerCase()
        filtered = filtered.filter((el: ISheetRow) =>
          el.name.toLowerCase().includes(searchTerm),
        )
      }

      // Apply firm filter
      if (this.selectedFirm) {
        filtered = filtered.filter((el: ISheetRow) =>
          el.name.toLowerCase().includes(this.selectedFirm!),
        )
      }

      this.data = filtered
    },
    setFirmFilter(firm: string | null) {
      this.selectedFirm = firm
      this.applyFirmFilter()
    },

    addCart(item: ISheetRow) {
      const storage = JSON.parse(localStorage.getItem('cart') || '[]')
      const existingItem = storage.find((cartItem: any) => cartItem.product.name === item.name)
      if (existingItem) {
        existingItem.count += 1
      }
      else {
        storage.push({
          product: { ...item, id: Date.now() }, // Generate unique ID
          count: 1,
        })
      }
      this.count = storage.length
      localStorage.setItem('cart', JSON.stringify(storage))
    },

    initCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      this.count = cart.length
    },

  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProducts, import.meta.hot))
}
