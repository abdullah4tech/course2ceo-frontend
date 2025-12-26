<template>
  <BaseCard
    class="h-full flex flex-col justify-between overflow-hidden relative group hover:shadow-lg transition-all duration-300 border border-border-light"
  >
    <div class="relative z-10">
      <div class="flex justify-between items-start mb-4">
        <div class="p-3 rounded-xl transition-colors duration-300" :class="iconBgClass">
          <component :is="icon" class="w-8 h-8" />
        </div>
        <div
          v-if="trend"
          class="flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full bg-surface-secondary"
        >
          <span :class="trend > 0 ? 'text-success' : 'text-error'">
            {{ trend > 0 ? '↑' : '↓' }} {{ Math.abs(trend) }}%
          </span>
        </div>
      </div>

      <div>
        <p class="text-text-secondary text-sm font-medium mb-1">{{ label }}</p>
        <h3 class="text-3xl font-bold text-text-primary tracking-tight">
          <span v-if="loading" class="animate-pulse">...</span>
          <span v-else>{{ displayValue }}</span>
        </h3>
      </div>
    </div>

    <!-- Decorative background element -->
    <div
      class="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-5 transition-transform duration-500 group-hover:scale-150"
      :class="bgClass"
    />
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'

interface StatCardProps {
  label: string
  value: number
  icon: Component
  trend?: number
  loading?: boolean
  variant?: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'info'
}

const props = withDefaults(defineProps<StatCardProps>(), {
  loading: false,
  variant: 'primary',
})

const displayValue = computed(() => {
  if (props.value >= 1000000) {
    return `${(props.value / 1000000).toFixed(1)}M`
  } else if (props.value >= 1000) {
    return `${(props.value / 1000).toFixed(1)}K`
  }
  return props.value.toString()
})

const iconBgClass = computed(() => {
  const variants = {
    primary: 'bg-brand-primary/10 text-brand-primary',
    accent: 'bg-brand-accent/10 text-brand-accent',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
    info: 'bg-info/10 text-info',
  }
  return variants[props.variant]
})

const bgClass = computed(() => {
  const variants = {
    primary: 'bg-brand-primary',
    accent: 'bg-brand-accent',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    info: 'bg-info',
  }
  return variants[props.variant]
})
</script>
