<script setup lang="ts">
import axios from 'axios'
import Papa from 'papaparse'
import { onMounted, ref } from 'vue'
import { categories } from '~/composables/useCategories'
import { useOverlay } from '~/composables/useOverlay'

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
            .slice(1)
            .filter((row: any[]) => row[0] && row[1]) // Filter out invalid rows
            .map((row: any[]) => ({
              name: row[0] || '',
              price: row[1] || '',
            })) as SheetRow[]
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


// localStorage'dan foydalanuvchi ma'lumotlarini o'qish
const getUserFromLocalStorage = (): any | null => {
  const user = localStorage.getItem('telegram_user');
  return user ? JSON.parse(user) : null;
};

// Telegram Web App ma'lumotlarini localStorage'ga saqlash
const saveUserToLocalStorage = () => {
  if (window.Telegram?.WebApp) {
    const webApp = window.Telegram.WebApp;
    const userData = webApp.initDataUnsafe?.user;

    if (userData) {
      // localStorage'da mavjud ma'lumotni tekshirish
      const existingUser = getUserFromLocalStorage();

      // Agar localStorage'da ma'lumot yo'q bo'lsa yoki foydalanuvchi ID'si boshqacha bo'lsa, saqlash
      if (!existingUser || existingUser.id !== userData.id) {
        localStorage.setItem('telegram_user', JSON.stringify(userData));
        console.log('Foydalanuvchi ma\'lumotlari saqlandi:', userData);
      } else {
        console.log('Foydalanuvchi ma\'lumotlari allaqachon mavjud:', existingUser);
      }

      // Telegram Web App-ni kengaytirish
      webApp.expand();
    } else {
      console.log('Foydalanuvchi ma\'lumotlari mavjud emas');
    }
  } else {
    console.log('Telegram WebApp mavjud emas');
  }
};

onMounted(() => {
  loadAllData()
  saveUserToLocalStorage()
})
</script>

<template>
  <div />
</template>
