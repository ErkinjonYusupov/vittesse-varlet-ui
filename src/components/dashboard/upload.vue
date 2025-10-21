<script setup lang="ts">
import axios from 'axios'
import Papa from 'papaparse'
import { onMounted, ref } from 'vue'

interface SheetRow {
  name: string
  price: string
}

const loading = ref(false)
const errorMessage = ref<string | null>(null)

const SPREADSHEET_ID = '1o0nM9qhNUcfrrCMDxdLjT5RRKuZwCeiVRPtgKnnQ6ng'
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour
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
            .slice(1)
            .filter((row: any[]) => row[0] && row[1]) // Filter out invalid rows
            .map((row: any[]) => ({
              name: row[0] || '',
              price: row[1] || '',
            })) as SheetRow[]
          store.setCategoryData(category, headers, newData)
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
    await Promise.all(store.getCategories.map(category => loadDataForCategory(category)))
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
