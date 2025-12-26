<script setup lang="ts">
import type { ButtonProps } from '@/types'
import { computed } from 'vue'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  iconPosition: 'left',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-md transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-brand-primary text-white hover:bg-brand-primary-hover shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-98',
    secondary:
      'bg-surface-primary border-1.5 border-border-medium text-text-primary hover:bg-surface-secondary hover:border-brand-primary hover:text-brand-primary',
    ghost: 'text-text-primary hover:bg-surface-secondary',
    danger:
      'bg-error text-white hover:bg-error/90 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-98',
  }

  const sizes = {
    sm: 'h-9 px-4 text-sm gap-1.5',
    md: 'h-12 px-6 text-base gap-2',
    lg: 'h-14 px-8 text-lg gap-2.5',
  }

  return `${base} ${variants[props.variant]} ${sizes[props.size]}`
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button :class="buttonClasses" :disabled="disabled || loading" @click="handleClick">
    <!-- Loading Spinner -->
    <svg
      v-if="loading"
      class="animate-spin"
      :class="size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>

    <!-- Left Icon -->
    <component :is="icon" v-if="icon && iconPosition === 'left' && !loading" class="h-5 w-5" />

    <!-- Button Content -->
    <slot />

    <!-- Right Icon -->
    <component :is="icon" v-if="icon && iconPosition === 'right' && !loading" class="h-5 w-5" />
  </button>
</template>
