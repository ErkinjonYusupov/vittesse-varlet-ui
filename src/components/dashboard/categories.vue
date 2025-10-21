<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { categories } from '~/composables/useCategories'

const { t } = useI18n()
const router = useRouter()
function showProducts(item: any) {
  router.push({ path: '/products', query: { key: item.key, title: item.title } })
}
</script>

<template>
 <div mx-auto my-0 max-w-500px p-2>
   <div v-for="(item, index) in categories" :key="index" >
    <q-card p-4 mb-2 dark:bg-gray-7 rounded-2xl @click="showProducts(item)">
      <div flex items-center gap-2>
        <Icon :icon="item.icon" width="40" height="40" text-gray-6 dark:text-gray-4/>
        <div text-20px text-gray-6 dark:text-gray-4>
          {{ t(item.title) }}
        </div>
      </div>
    </q-card>
  </div>
 </div>
</template>


