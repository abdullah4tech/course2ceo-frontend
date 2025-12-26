<script setup lang="ts">
import { computed } from 'vue'

interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
  size: 'md',
})

const badgeClasses = computed(() => {
  const base = 'inline-flex items-center justify-center font-medium rounded-full'

  const variants = {
    success: 'bg-success-light text-success',
    warning: 'bg-warning-light text-warning',
    error: 'bg-error-light text-error',
    info: 'bg-info-light text-info',
    default: 'bg-gray-200 text-gray-700',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  }

  return `${base} ${variants[props.variant]} ${sizes[props.size]}`
})
</script>

<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>
