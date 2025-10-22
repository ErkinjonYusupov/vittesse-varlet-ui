<script setup lang="ts">
import axios from 'axios'
import Papa from 'papaparse'
import { onMounted, ref } from 'vue'
import { categories } from '~/composables/useCategories'

interface SheetRow {
  name: string
  price: string
}

const loading = ref(false)
const errorMessage = ref<string | null>(null)
const SPREADSHEET_ID = import.meta.env.VITE_APP_SPREADSHEET_ID
const CACHE_DURATION = Number(import.meta.env.VITE_APP_CACHE_DURATION)// 1 hour
const store = indexStore()
async function loadDataForCategory(category: string) {
  const cacheKey = `sheetData_${category}`
  store.loadData(category)
  if (store.getCategoryData(category).length > 0) {
    const cachedData = localStorage.getItem(cacheKey)
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData)
        if (parsed.timestamp && Date.now() - parsed.timestamp < CACHE_DURATION) {
          return
        }
      }
      catch (error) {
        console.error(`Error parsing cached data for ${category}:`, error)
        localStorage.removeItem(cacheKey)
      }
    }
  }

  try {
    const response = await axios.get(
      `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${category}`,
    )
    Papa.parse(response.data, {
      complete: (result: Papa.ParseResult<any>) => {
        if (result.data && result.data.length > 0) {
          const headers = result.data[0] as string[]
          const newData = result.data
            // .slice(1)
            .filter((row: any[]) => row[0] && row[1]) // Filter out invalid rows
            .map((row: any[]) => ({
              name: row[0] || '',
              price: row[1] || '',
            })) as SheetRow[]
          localStorage.removeItem('cart')
          localStorage.setItem(
            cacheKey,
            JSON.stringify({
              headers,
              data: newData,
              timestamp: Date.now(),
            }),
          )
        }
      },
      header: false,
      skipEmptyLines: true,
    })
  }
  catch (error: any) {
    console.error(`Xato (${category}):`, error)
    errorMessage.value = `Ma'lumotlarni yuklashda xato (${category})! Sheet public ekanligini tekshiring.`
  }
}

async function loadAllData() {
  loading.value = true
  errorMessage.value = null
  try {
    await Promise.all(categories.map(category => loadDataForCategory(category.key)))
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  loadAllData()
})
</script>

<template>
  <div />
</template>
