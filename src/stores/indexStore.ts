import type { ISheetRow } from '~/types'
import { acceptHMRUpdate, defineStore } from 'pinia'

interface CategoryData {
  headers: string[]
  data: ISheetRow[]
}

interface IState {
  categoriesData: Record<string, CategoryData>
  // categories: string[]
}

export const indexStore = defineStore('index-store', {
  state: (): IState => ({
    categoriesData: {},
  }),
  getters: {
    getDataCount(state): Record<string, number> {
      return Object.fromEntries(
        Object.entries(state.categoriesData).map(([category, { data }]) => [category, data.length]),
      )
    },
    getCategoryData: state => (category: string): ISheetRow[] => {
      return state.categoriesData[category]?.data || []
    },
    getCategoryHeaders: state => (category: string): string[] => {
      return state.categoriesData[category]?.headers || []
    },
  },
  actions: {
    loadData(category: string) {
      const cacheKey = `sheetData_${category}`
      const cachedData = localStorage.getItem(cacheKey)
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData)
          if (parsed.data && Array.isArray(parsed.data) && parsed.headers) {
            this.categoriesData[category] = {
              headers: parsed.headers,
              data: parsed.data.filter((row: ISheetRow) => row.name && row.price) as ISheetRow[],
            }
          }
          else {
            console.warn(`No valid data found in localStorage for ${category}`)
            this.categoriesData[category] = { headers: [], data: [] }
          }
        }
        catch (error) {
          console.error(`Error parsing cached data for ${category}:`, error)
          localStorage.removeItem(cacheKey)
          this.categoriesData[category] = { headers: [], data: [] }
        }
      }
      else {
        console.warn(`No cached data found in localStorage for ${category}`)
        this.categoriesData[category] = { headers: [], data: [] }
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(indexStore, import.meta.hot))
}
