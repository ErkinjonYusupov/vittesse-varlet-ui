<script setup lang="ts">
import Categories from '~/components/dashboard/categories.vue'

const count = ref<number>(0)
function initCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  count.value = cart.length
}

onMounted(() => {
  initCartCount()
})
</script>

<template>
  <Upload />
  <div>
    <AppBar :count="count" />
    <Categories />
  </div>
</template>
