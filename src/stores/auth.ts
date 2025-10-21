import { acceptHMRUpdate, defineStore } from 'pinia'

interface SheetRow {
  name: string
  price: string
}

interface CategoryData {
  headers: string[]
  data: SheetRow[]
}

interface IState {
  categoriesData: Record<string, CategoryData>
  categories: string[]
}

export const indexStore = defineStore('index-store', {
  state: (): IState => ({
    categoriesData: {},
    categories: ['cpu', 'mb', 'psu', 'ozu'],
  }),
  getters: {
    getDataCount(state): Record<string, number> {
      return Object.fromEntries(
        Object.entries(state.categoriesData).map(([category, { data }]) => [category, data.length]),
      )
    },
    getCategories(state): string[] {
      return state.categories
    },
    getCategoryData: state => (category: string): SheetRow[] => {
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
              data: parsed.data.filter((row: SheetRow) => row.name && row.price) as SheetRow[],
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
    setCategoryData(category: string, headers: string[], data: SheetRow[]) {
      this.categoriesData[category] = {
        headers,
        data: data.filter(row => row.name && row.price),
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(indexStore, import.meta.hot))
}
