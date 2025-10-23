<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js'
import { useProducts } from '~/stores/products'

const { t } = useI18n()
const store = useProducts()
const notify = useNotify()
function addCart(item: any) {
  store.addCart(item)
  notify.success(t('tr35'))
}
</script>

<template>
  <div v-for="item in store.data" :key="item.name" mx-2 mb-2 rounded-2xl bg-white p-4 dark:bg-gray-7>
    <div flex items-center justify-between>
      <div>
        <div text-18px font-700>
          {{ item.name }}
        </div>
        <div mt-2 inline-block border border-green-5 rounded-10px px-3 text-16px text-green-6 font-600>
          $ {{ item.price }}
        </div>
      </div>
      <q-btn flat @click="addCart(item)">
        <Icon icon="basil:add-outline" width="36px" />
      </q-btn>
    </div>
  </div>
</template>
