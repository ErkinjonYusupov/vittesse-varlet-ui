<script setup lang="ts">
import axios from 'axios'
import Papa from 'papaparse'
import { onMounted, ref } from 'vue'

const data = ref<any[][]>([])
const headers = ref<string[]>([])
const loading = ref(false)

const SPREADSHEET_ID = '1o0nM9qhNUcfrrCMDxdLjT5RRKuZwCeiVRPtgKnnQ6ng' // O'zingizning Sheet ID
const SHEET_NAME = 'Sheet1'

async function loadData() {
  const cachedData = localStorage.getItem('sheetData')
  if (cachedData) {
    const parsed = JSON.parse(cachedData)
    headers.value = parsed.headers
    data.value = parsed.data
    return
  }
  loading.value = true
  try {
    const response = await axios.get(
      `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`,
    )
    Papa.parse(response.data, {
      complete: (result: Papa.ParseResult<any>) => {
        if (result.data && result.data.length > 0) {
          headers.value = result.data[0] as string[]
          data.value = result.data.slice(1) as any[][]
          localStorage.setItem('sheetData', JSON.stringify({ headers: headers.value, data: data.value }))
        }
      },
      header: false,
      skipEmptyLines: true,
    })
    console.log('Ma\'lumotlar yuklandi:', data.value)
  }
  catch (error: any) {
    console.error('Xato:', error)
    alert('Ma\'lumotlarni yuklashda xato! Sheet public ekanligini tekshiring.')
  }
  finally {
    loading.value = false
  }
}

async function refreshData() {
  localStorage.removeItem('sheetData')
  await loadData()
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="container">
    <h2>Google Sheets dan ma'lumotlar (CSV)</h2>
    <div v-if="loading">
      Yuklanmoqda...
    </div>
    <div v-else-if="data.length > 0" class="table-section">
      <h3>Ma'lumotlar jadvali</h3>
      <table border="1">
        <thead>
          <tr>
            <th v-for="(header, index) in headers" :key="index">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in data" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Ma'lumotlar mavjud emas.</p>
    </div>
    <button @click="refreshData">
      Qayta yuklash
    </button>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.table-section {
  margin-top: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}
th {
  background-color: #f4f4f4;
}
button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
p {
  color: #888;
}
</style>
