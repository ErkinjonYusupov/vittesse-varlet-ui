<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js'
import { ref } from 'vue'
// Props
interface Props {
  initialValue?: number
  min?: number
  max?: number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  initialValue: 1,
  min: 0,
  max: 999,
  color: '#0d9488',
})

// Emit
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'onTap', action: 'increment' | 'decrement'): void // onTap emit qo‘shildi
}>()

// Reaktiv holat
const count = ref(props.initialValue)

// Count ni oshirish
function increment() {
  if (count.value < props.max) {
    count.value++
    emit('update:modelValue', count.value)
    emit('onTap', 'increment') // onTap emit chaqirildi
  }
}

// Count ni kamaytirish
function decrement() {
  if (count.value >= props.min) {
    count.value--
    emit('update:modelValue', count.value)
    emit('onTap', 'decrement') // onTap emit chaqirildi
  }
}
</script>

<template>
  <div class="counter flex items-center gap-2 rounded-lg bg-gray-100 p-2">
    <!-- Kamaytirish tugmasi -->
    <button
      class="counter-btn h-8 w-8 flex items-center justify-center text-2xl text-teal-600 font-bold"
      @click="decrement"
    >
      <Icon v-if="count <= min" icon="hugeicons:delete-02" width="24" height="24" color="red" />
      <div v-else>
        -
      </div>
    </button>

    <!-- Raqam -->
    <span class="counter-value w-8 text-center text-lg font-semibold">
      {{ count }}
    </span>

    <!-- Oshirish tugmasi -->
    <button
      class="counter-btn h-8 w-8 flex items-center justify-center text-2xl text-teal-600 font-bold"
      :disabled="count >= max"
      @click="increment"
    >
      +
    </button>
  </div>
</template>

<style scoped lang="scss">
.counter {
  display: inline-flex;
  border: 1px solid #e5e7eb;
  background-color: #f3f4f6;
  border-radius: 8px;
  padding: 4px 8px;
  min-width: 120px;
  flex-shrink: 0;
  justify-content: space-between;
}

.counter-btn {
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    color: #0d9488;
  }

  &:disabled {
    color: #d1d5db;
    cursor: not-allowed;
  }
}

.counter-value {
  width: 32px;
  text-align: center;
  color: #374151;
}
</style>
