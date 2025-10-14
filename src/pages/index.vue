<script setup lang="ts">
import { StyleProvider, Themes } from '@varlet/ui'

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
  <div>
    test
  </div>
</template>
