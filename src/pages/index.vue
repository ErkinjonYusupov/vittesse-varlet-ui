<script setup lang="ts">
import { StyleProvider, Themes } from '@varlet/ui'

const store = indexStore()
onMounted(() => {
  if (isDark.value) {
    StyleProvider(Themes.md3Dark)
  }
  else {
    StyleProvider(Themes.md3Light)
  }
})
</script>

<template>
  <Upload />
  <div>
    {{ store.getCategoryData('mb') }}
  </div>
</template>
