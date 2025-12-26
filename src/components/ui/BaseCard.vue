<script setup lang="ts">
interface CardProps {
  elevation?: 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<CardProps>(), {
  elevation: 'md',
  hover: true,
  padding: 'md',
})

const cardClasses = computed(() => {
  const base =
    'bg-surface-elevated rounded-lg border border-border-light transition-all duration-medium'

  const elevations = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  }

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const hoverEffect = props.hover ? 'hover:shadow-xl hover:-translate-y-1' : ''

  return `${base} ${elevations[props.elevation]} ${paddings[props.padding]} ${hoverEffect}`
})
</script>

<script lang="ts">
import { computed } from 'vue'
</script>

<template>
  <div :class="cardClasses">
    <!-- Header Slot -->
    <div v-if="$slots.header" class="mb-4">
      <slot name="header" />
    </div>

    <!-- Default Content -->
    <slot />

    <!-- Footer Slot -->
    <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-border-light">
      <slot name="footer" />
    </div>
  </div>
</template>
