<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

interface Props {
  label?: string | number
  prepend?: string
  append?: string
  bg?: string
  color?: string
  size?: 'large' | 'medium' | 'dense'
  loading?: boolean
  outlined?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  color: '#fff',
  bg: '#00954a',
  size: 'medium',
  loading: false,
  outlined: false,
  disabled: false,
  type: 'button',
})

// Dinamik klasslarni hisoblash
const buttonClasses = computed(() => ({
  [props.size]: true,
  'btn-outlined': props.outlined,
  'btn-disabled': props.disabled || props.loading,
}))
</script>

<template>
  <button
    :type="type"
    flex
    class="btn_"
    :class="buttonClasses"
    items-center
    gap-8px
    :disabled="disabled || loading"
    :style="{ background: !outlined ? bg : 'transparent', color: !outlined ? color : bg }"
  >
    <Icon
      v-if="prepend || loading"
      :icon="loading ? 'mingcute:loading-fill' : (prepend || '')"
      :color="outlined ? bg : color"
      class="icon"
      :class="{ 'animate-spin': loading }"
    />
    <span v-if="label" class="label font-600">
      {{ label }}
    </span>
    <Icon
      v-if="append"
      :icon="append"
      :color="outlined ? bg : color"
      class="icon"
    />
  </button>
</template>

<style scoped lang="scss">
.btn_ {
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  cursor: pointer;
  transition:
    transform 0.1s ease,
    background 0.2s ease;

  /* Icon o‘lchamlarini chegaralash */
  & .icon {
    flex-shrink: 0; /* Icon qisilmasligi uchun */
    max-height: 100%; /* Button balandligidan oshmasligi uchun */
  }

  /* Hover effekti */
  &:hover:not(.btn-disabled) {
    filter: brightness(1.1);
  }

  /* Active effekti */
  &:active:not(.btn-disabled) {
    transform: translateY(2px);
  }

  /* Disabled holati */
  &.btn-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Outlined holati */
  &.btn-outlined {
    border: 1px solid currentColor; /* bg rangidan foydalanadi */
  }
}

/* O‘lchamlar */
.large {
  @apply py-10.5px px-24px rounded-8px;
  & .label {
    @apply text-16px font-500;
  }
  & .icon {
    @apply text-20px; /* Sabit o‘lcham */
  }
}

.medium {
  @apply py-7px px-16px rounded-6px;
  & .label {
    @apply text-14px font-400;
  }
  & .icon {
    @apply text-16px; /* Sabit o‘lcham */
  }
}

.dense {
  @apply py-4px px-12px rounded-5px;
  & .label {
    @apply text-12px font-300;
  }
  & .icon {
    @apply text-14px; /* Sabit o‘lcham */
  }
}

/* Responsive dizayn */
@media (max-width: 1024px) {
  .large {
    @apply py-9px px-20px rounded-7px;
    & .label {
      @apply text-15px;
    }
    & .icon {
      @apply text-18px;
    }
  }
  .medium {
    @apply py-6px px-14px rounded-5px;
    & .label {
      @apply text-13px;
    }
    & .icon {
      @apply text-14px;
    }
  }
  .dense {
    @apply py-3px px-10px rounded-4px;
    & .label {
      @apply text-11px;
    }
    & .icon {
      @apply text-12px;
    }
  }
}

@media (min-width: 1025px) and (max-width: 1440px) {
  .large {
    @apply py-12px px-18px rounded-10px;
    & .label {
      @apply text-18px font-500;
    }
    & .icon {
      @apply text-22px;
    }
  }
  .medium {
    @apply py-8px px-12px rounded-6px;
    & .label {
      @apply text-14px;
    }
    & .icon {
      @apply text-16px;
    }
  }
  .dense {
    @apply py-5px px-10px rounded-5px;
    & .label {
      @apply text-12px;
    }
    & .icon {
      @apply text-14px;
    }
  }
}
</style>
