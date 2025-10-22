<script lang="ts" setup>
import type { ISheetRow } from '~/types'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { useLoadData } from '~/composables/useData'

const { t } = useI18n()
const route = useRoute()

const search = ref<string>('')
const data = ref<ISheetRow[]>([])
const originalData = ref<ISheetRow[]>([]) // Store original data to reset on clear

// Load data initially
function loadData() {
  data.value = []
  originalData.value = []
  const loadedData = useLoadData(route.query.key as string)
  data.value = loadedData
  originalData.value = loadedData // Save original data
}

// Search function
function searchProduct() {
  if (search.value.trim()) {
    const searchTerm = search.value.trim().toLowerCase()
    data.value = originalData.value.filter((el: ISheetRow) =>
      el.name.toLowerCase().includes(searchTerm),
    )
  }
  else {
    data.value = [...originalData.value] // Reset to original data
  }
}

onMounted(() => {
  loadData()
})

function addCart(item: ISheetRow) {
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
  localStorage.setItem('cart', JSON.stringify(storage))
}
</script>

<template>
  <AppBar>
    <div bg-white pb-2 dark:bg-gray-8>
      <div px-4 py-2 text-18px text-gray font-600>
        {{ t(route.query.title as string) }}
      </div>
      <div mx-2 border border-gray rounded-2xl bg-white px-4 dark:bg-gray-6>
        <q-input
          v-model="search" :label="t('tr5')" borderless color="green-8"
          @update:model-value="searchProduct"
        />
      </div>
    </div>
  </AppBar>
  <div mx-auto my-0 max-w-500px>
    <div pb-2 />
    <div v-for="item in data" :key="item.name" mx-2 mb-2 rounded-2xl bg-white p-4 dark:bg-gray-7>
      <div flex items-center justify-between>
        <div>
          <div text-18px font-700>
            {{ item.name }}
          </div>
          <div mt-2 inline-block border border-green-5 rounded-10px px-3 text-16px text-green-6 font-600>
            $ {{
              item.price }}
          </div>
        </div>
        <q-btn flat @click="addCart(item)">
          <Icon icon="basil:add-outline" width="36px" />
        </q-btn>
      </div>
    </div>
    <div pb-4 />
  </div>
</template>
