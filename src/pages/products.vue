<script lang="ts" setup>
import { useProducts } from '~/stores/products'

const store = useProducts()
const route = useRoute()
onMounted(() => {
  store.loadData(route.query.key as string)
  store.initCartCount()
})
</script>

<template>
  <ProductHeader />
  <div mx-auto my-0 max-w-500px>
    <div pb-2 />
    <ProductsItems />
    <div pb-4 />
  </div>
</template>
