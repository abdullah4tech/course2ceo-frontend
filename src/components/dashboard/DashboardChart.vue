<template>
  <BaseCard class="h-full flex flex-col">
    <template #header>
      <div class="flex items-center justify-between mb-2">
        <h3 class="font-semibold text-text-primary">{{ title }}</h3>
        <select
          class="text-sm border-none bg-transparent text-text-secondary focus:ring-0 cursor-pointer"
        >
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>
    </template>

    <div class="flex-1 flex items-end justify-between gap-2 px-2 min-h-[150px]">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="flex flex-col items-center gap-2 w-full group"
      >
        <div
          class="w-full bg-surface-secondary rounded-t-lg relative overflow-hidden transition-all duration-500 hover:opacity-80"
          :style="{ height: `${(item.value / maxValue) * 100}%` }"
        >
          <div
            class="absolute inset-0 bg-gradient-to-t from-brand-primary to-brand-accent opacity-80"
          />

          <!-- Tooltip -->
          <div
            class="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-primary shadow-lg rounded px-2 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10"
          >
            {{ item.value }}
          </div>
        </div>
        <span class="text-xs text-text-secondary">{{ item.label }}</span>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'

interface ChartData {
  label: string
  value: number
}

interface Props {
  title?: string
  data?: ChartData[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Activity Overview',
  data: () => [
    { label: 'Mon', value: 45 },
    { label: 'Tue', value: 60 },
    { label: 'Wed', value: 35 },
    { label: 'Thu', value: 80 },
    { label: 'Fri', value: 55 },
    { label: 'Sat', value: 20 },
    { label: 'Sun', value: 40 },
  ],
})

const maxValue = computed(() => {
  return Math.max(...props.data.map((d) => d.value)) * 1.1
})
</script>
