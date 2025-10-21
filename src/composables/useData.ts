import type { ISheetRow } from '~/types'

export function useLoadData(category: string) {
  const cacheKey = `sheetData_${category}`
  const cachedData = localStorage.getItem(cacheKey)
  if (cachedData) {
    try {
      const parsed = JSON.parse(cachedData)
      if (parsed.data && Array.isArray(parsed.data) && parsed.headers) {
        return parsed.data.filter((row: ISheetRow) => row.name && row.price) as ISheetRow[]
      }
      else {
        console.warn(`No valid data found in localStorage for ${category}`)
        return []
      }
    }
    catch (error) {
      console.error(`Error parsing cached data for ${category}:`, error)
      localStorage.removeItem(cacheKey)
      return []
    }
  }
  else {
    console.warn(`No cached data found in localStorage for ${category}`)
    return []
  }
}
