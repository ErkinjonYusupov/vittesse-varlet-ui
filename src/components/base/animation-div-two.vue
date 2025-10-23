<script setup lang="ts">
interface IProps {
  index: number
  time?: number
}
const props = withDefaults(defineProps<IProps>(), {
  time: 0.1,
})
</script>

<template>
  <div
    class="catalog-button-wrapper"
    :style="{ animationDelay: `${props.index > 10 ? 1 : props.index * props.time}s` }"
  >
    <slot />
  </div>
</template>

<style scoped>
  .catalog-button-wrapper {
  animation: slideFromBottom 0.5s ease forwards;
  opacity: 0;
}

@keyframes slideFromBottom {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
