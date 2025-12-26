<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { adminVideoAPI, studentVideoAPI } from '@/services/api'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import { useToast } from '@/composables/useToast'
import type { VideoWithPermission, VideoWithCreator } from '@/types/api'

const authStore = useAuthStore()
const toast = useToast()

const activeFilter = ref('all')
const videos = ref<(VideoWithCreator | VideoWithPermission)[]>([])
const loading = ref(true)
const isAdmin = computed(() => authStore.user?.role === 'admin')

const filters = computed(() => {
  if (isAdmin.value) {
    return [{ id: 'all', label: 'All Videos' }]
  } else {
    return [
      { id: 'all', label: 'All Videos' },
      { id: 'granted', label: 'Granted Access' },
      { id: 'pending', label: 'Pending Access' },
      { id: 'no-access', label: 'No Access' },
    ]
  }
})

const filteredVideos = computed(() => {
  if (activeFilter.value === 'all') {
    return videos.value
  }

  // Student-specific filters
  if (!isAdmin.value) {
    const studentVideos = videos.value as VideoWithPermission[]

    if (activeFilter.value === 'granted') {
      return studentVideos.filter((v) => v.hasPermission)
    }
    if (activeFilter.value === 'no-access') {
      return studentVideos.filter((v) => !v.hasPermission)
    }
  }

  return videos.value
})

const loadVideos = async () => {
  try {
    loading.value = true

    if (isAdmin.value) {
      // Admin: Fetch all videos
      const response = await adminVideoAPI.list()
      videos.value = response.videos
    } else {
      // Student: Fetch videos with permission status
      const response = await studentVideoAPI.list()
      videos.value = response.videos
    }
  } catch (error: any) {
    console.error('Failed to fetch videos:', error)
    toast.error(
      'Failed to Load Videos',
      error.message || 'Could not load videos. Please try again.',
    )
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

onMounted(() => {
  loadVideos()
})
</script>

<template>
  <div class="w-full space-y-4 sm:space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex-1 min-w-0">
        <h1 class="text-3xl sm:text-4xl font-bold text-gradient mb-2">Video Library</h1>
        <p class="text-text-secondary text-base sm:text-lg">
          {{ isAdmin ? 'Manage your course videos' : 'Browse and watch your course videos' }}
        </p>
      </div>
      <BaseButton
        v-if="isAdmin"
        variant="primary"
        @click="$router.push('/videos/upload')"
        class="w-full sm:w-auto"
      >
        Upload Video
      </BaseButton>
    </div>

    <!-- Filters -->
    <BaseCard>
      <div class="flex flex-wrap gap-3">
        <BaseButton
          v-for="filter in filters"
          :key="filter.id"
          :variant="activeFilter === filter.id ? 'primary' : 'ghost'"
          size="sm"
          @click="activeFilter = filter.id"
        >
          {{ filter.label }}
        </BaseButton>
      </div>
    </BaseCard>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BaseCard v-for="i in 6" :key="i" class="animate-pulse">
        <div class="aspect-video bg-gray-200 rounded-lg mb-4"></div>
        <div class="space-y-2">
          <div class="h-6 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </BaseCard>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredVideos.length === 0" class="text-center py-16">
      <div class="text-6xl mb-4">📹</div>
      <h3 class="text-xl font-semibold text-gray-700 mb-2">No videos found</h3>
      <p class="text-gray-500">
        {{
          isAdmin ? 'Upload your first video to get started' : 'No videos available at the moment'
        }}
      </p>
    </div>

    <!-- Video Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      <BaseCard
        v-for="video in filteredVideos"
        :key="video.id"
        elevation="md"
        class="cursor-pointer hover:elevation-lg transition-all group"
        @click="$router.push(`/videos/${video.id}`)"
      >
        <!-- Thumbnail -->
        <div
          class="aspect-video bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 rounded-lg mb-4 overflow-hidden"
        >
          <img
            v-if="video.thumbnailUrl"
            :src="video.thumbnailUrl"
            :alt="video.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-6xl">🎥</div>
        </div>

        <div class="space-y-2">
          <div class="flex items-start justify-between gap-2">
            <h3 class="text-lg font-semibold text-text-primary line-clamp-2">
              {{ video.title }}
            </h3>
            <BaseBadge
              v-if="!isAdmin && 'hasPermission' in video"
              :variant="video.hasPermission ? 'success' : 'warning'"
              class="flex-shrink-0"
            >
              {{ video.hasPermission ? 'Access' : 'Locked' }}
            </BaseBadge>
          </div>

          <p class="text-text-secondary text-sm line-clamp-2">
            {{ video.description || 'No description available' }}
          </p>

          <div class="flex items-center gap-4 text-xs text-text-secondary">
            <span>📅 {{ formatDate(video.createdAt) }}</span>
            <span v-if="'creator' in video && video.creator"> 👤 {{ video.creator.name }} </span>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
