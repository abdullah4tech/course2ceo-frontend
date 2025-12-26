<template>
  <BaseCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-text-primary">{{ title }}</h2>
        <BaseButton v-if="showViewAll" variant="ghost" size="sm" @click="$emit('viewAll')">
          View All
        </BaseButton>
      </div>
    </template>

    <!-- Empty State -->
    <div v-if="!loading && activities.length === 0" class="text-center py-12">
      <DocumentTextIcon class="w-16 h-16 mx-auto mb-4 text-gray-300" />
      <p class="text-text-secondary">{{ emptyMessage }}</p>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="flex items-start gap-4 p-4 animate-pulse">
        <div class="h-10 w-10 rounded-lg bg-surface-secondary" />
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-surface-secondary rounded w-3/4" />
          <div class="h-3 bg-surface-secondary rounded w-1/2" />
        </div>
      </div>
    </div>

    <!-- Activity List -->
    <div v-else class="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
      <div
        v-for="(activity, index) in activities"
        :key="activity.id"
        class="activity-item group flex items-start gap-4 p-4 rounded-lg hover:bg-surface-secondary transition-all duration-300 cursor-pointer"
        :style="{ animationDelay: `${index * 100}ms` }"
        @click="$emit('activityClick', activity)"
      >
        <!-- Icon/Avatar -->
        <div
          class="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
          :class="getIconBgClass(activity.type)"
        >
          <component
            :is="
              activity.icon
                ? typeof activity.icon === 'string'
                  ? 'span'
                  : activity.icon
                : getDefaultIcon(activity.type)
            "
            class="w-6 h-6"
          >
            {{ typeof activity.icon === 'string' ? activity.icon : '' }}
          </component>
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <p
                class="font-medium text-text-primary truncate group-hover:text-brand-primary transition-colors"
              >
                {{ activity.title }}
              </p>
              <p class="text-sm text-text-secondary mt-0.5 line-clamp-2">
                {{ activity.description }}
              </p>
              <p v-if="activity.user" class="text-xs text-text-secondary mt-1">
                by {{ activity.user.name }}
              </p>
            </div>
            <span class="text-xs text-text-secondary whitespace-nowrap flex-shrink-0">
              {{ formatTimestamp(activity.timestamp) }}
            </span>
          </div>
        </div>

        <!-- Status Badge (if applicable) -->
        <BaseBadge
          v-if="activity.status"
          :variant="getStatusVariant(activity.status)"
          size="sm"
          class="flex-shrink-0"
        >
          {{ activity.status }}
        </BaseBadge>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import type { DashboardActivity } from '@/types/api'
import {
  VideoCameraIcon,
  LockClosedIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
} from '@heroicons/vue/24/outline'

interface ActivityFeedProps {
  title?: string
  activities: DashboardActivity[]
  loading?: boolean
  showViewAll?: boolean
  emptyMessage?: string
}

withDefaults(defineProps<ActivityFeedProps>(), {
  title: 'Recent Activity',
  loading: false,
  showViewAll: true,
  emptyMessage: 'No recent activity',
})

defineEmits<{
  viewAll: []
  activityClick: [activity: DashboardActivity]
}>()

const getDefaultIcon = (type: DashboardActivity['type']): Component => {
  const icons = {
    video_upload: VideoCameraIcon,
    access_request: LockClosedIcon,
    permission_granted: CheckCircleIcon,
    permission_revoked: XCircleIcon,
  }
  return icons[type] || DocumentTextIcon
}

const getIconBgClass = (type: DashboardActivity['type']): string => {
  const classes = {
    video_upload: 'bg-brand-primary/10 text-brand-primary',
    access_request: 'bg-warning/10 text-warning',
    permission_granted: 'bg-success/10 text-success',
    permission_revoked: 'bg-error/10 text-error',
  }
  return classes[type] || 'bg-brand-accent/10 text-brand-accent'
}

const getStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'info' | 'default' => {
  if (status.includes('approved') || status.includes('granted')) return 'success'
  if (status.includes('pending')) return 'warning'
  if (status.includes('rejected') || status.includes('revoked')) return 'error'
  return 'info'
}

const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}
</script>

<style scoped>
.activity-item {
  animation: slideIn 0.3s ease-out forwards;
  opacity: 0;
  transform: translateX(-10px);
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-border-medium);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--color-border-dark);
}
</style>
