<script lang="ts" setup>
import type { ISheetRow } from '~/types'
import { useLoadData } from '~/composables/useData'
import { Icon } from '@iconify/vue/dist/iconify.js'
const { t } = useI18n()
const route = useRoute()

const search = ref<string>('')
const data = ref<ISheetRow[]>([])
const originalData = ref<ISheetRow[]>([]) // Store original data to reset on clear

// Load data initially
function loadData() {
    const loadedData = useLoadData(route.query.key as string)
    data.value = loadedData
    originalData.value = loadedData // Save original data
}

// Search function
function searchProduct() {
    if (search.value.trim()) {
        const searchTerm = search.value.trim().toLowerCase()
        data.value = originalData.value.filter((el: ISheetRow) =>
            el.name.toLowerCase().includes(searchTerm)
        )
    } else {
        data.value = [...originalData.value] // Reset to original data
    }
}

onMounted(() => {
    loadData()
})
</script>

<template>
    <div mx-auto my-0 max-w-500px>
        <div text-18px font-600 px-4 my-2>{{ t(route.query.title as string) }}</div>
        <div mx-2 bg-white rounded-2xl px-4 dark:bg-gray-6>
            <q-input v-model="search" :label="t('tr5')"  borderless @update:model-value="searchProduct" />
        </div>
        <br>
        <div v-for="item in data" :key="item.name" bg-white dark:bg-gray-7 mb-2 p-4 mx-2 rounded-2xl>
            <div flex justify-between items-center>
                <div>
                    <div text-18px font-700>{{ item.name }}</div>
                    <div text-16px border border-green-5 inline-block px-3 mt-2 rounded-10px text-green-6 font-600>$ {{ item.price }}</div>
                </div>
                <q-btn flat>
                    <Icon icon="basil:add-outline" width="36px"/>
                </q-btn>
            </div>
        </div>
    </div>
</template>
