<template>
  <div class="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white">
    <!-- Video Player Section - Sticky, True Full Width -->
    <div class="sticky top-0 z-40 bg-black">
      <!-- Loading State -->
      <div
        v-if="loading"
        class="aspect-video bg-gray-900 animate-pulse flex items-center justify-center"
      >
        <div
          class="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"
        ></div>
      </div>

      <!-- Video Player with Permission -->
      <div v-else-if="video && hasPermission && videoStreamUrl" class="relative">
        <!-- Use aspect-video for perfect 16:9 ratio -->
        <div class="aspect-video w-full bg-black">
          <VideoPlayer :src="videoStreamUrl" :poster="video.thumbnailUrl" />
        </div>

        <!-- Floating Back Button -->
        <button
          @click="$router.push('/videos')"
          class="absolute top-4 left-4 z-50 w-12 h-12 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center hover:bg-black/90 transition-all duration-300 hover:scale-110 shadow-2xl ring-1 ring-white/10"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <!-- Locked Video (No Permission) -->
      <div
        v-else-if="video"
        class="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center p-6 sm:p-12 relative"
      >
        <!-- Back Button for locked state too -->
        <button
          @click="$router.push('/videos')"
          class="absolute top-4 left-4 w-12 h-12 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center hover:bg-black/90 transition-all duration-300 hover:scale-110 shadow-2xl ring-1 ring-white/10"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div class="text-center max-w-md">
          <div
            class="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-2xl ring-1 ring-white/20"
          >
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 class="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">Content Locked</h3>
          <p class="text-gray-300 mb-6 text-base leading-relaxed">
            {{
              canRequestAccess
                ? 'Request access from your instructor to unlock this video.'
                : 'Your access request is pending approval.'
            }}
          </p>
          <button
            v-if="canRequestAccess"
            :disabled="requestingAccess"
            @click="requestAccess"
            class="px-8 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-h-[48px] min-w-[180px] shadow-2xl hover:shadow-white/25"
          >
            {{ requestingAccess ? 'Requesting...' : 'Request Access' }}
          </button>
          <div
            v-else
            class="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-semibold ring-1 ring-yellow-500/30"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Pending Approval
          </div>
        </div>
      </div>

      <!-- Gradient Overlay for smooth transition -->
      <div
        class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-900 pointer-events-none"
      ></div>
    </div>

    <!-- Content Section - No side padding for full width -->
    <div v-if="video" class="bg-gradient-to-b from-gray-900 to-gray-950">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 rounded-t-3xl -mt-6 relative z-10"
      >
        <!-- Title & Metadata -->
        <div class="mb-6 space-y-6">
          <div class="flex items-start justify-between gap-4 flex-wrap">
            <h1
              class="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight flex-1 text-white"
            >
              {{ video.title }}
            </h1>

            <!-- Access Badge - Tailwind Glow-Up -->
            <div
              v-if="!isAdmin && 'hasPermission' in video"
              class="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 shadow-lg"
              :class="
                video.hasPermission
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 ring-1 ring-emerald-500/30 hover:ring-emerald-500/50 hover:shadow-emerald-500/25'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300 ring-1 ring-gray-600/50 hover:ring-gray-500/50'
              "
            >
              <span class="flex items-center gap-2">
                <svg
                  v-if="video.hasPermission"
                  class="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ video.hasPermission ? 'Full Access' : 'Locked' }}
              </span>
            </div>
          </div>

          <!-- Metadata Row -->
          <div class="flex items-center gap-4 flex-wrap text-sm text-gray-300">
            <span
              v-if="'creator' in video && video.creator"
              class="flex items-center gap-2 text-gray-300"
            >
              <div
                class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-lg"
              >
                {{ video.creator.name.charAt(0).toUpperCase() }}
              </div>
              <span class="text-gray-200">{{ video.creator.name }}</span>
            </span>
            <span class="flex items-center gap-1.5 text-gray-300">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {{ formatDate(video.createdAt) }}
            </span>
          </div>
        </div>

        <!-- Description - Collapsible -->
        <div class="mb-8">
          <div class="relative">
            <p
              class="text-base sm:text-lg text-gray-300 leading-relaxed transition-all duration-300"
              :class="isDescriptionExpanded ? '' : 'line-clamp-3'"
            >
              {{ video.description || 'No description available for this video.' }}
            </p>

            <!-- Show More/Less Button -->
            <button
              v-if="video.description && video.description.length > 150"
              @click="isDescriptionExpanded = !isDescriptionExpanded"
              class="mt-3 text-sm font-semibold text-white/80 hover:text-white transition-all duration-300 flex items-center gap-1 hover:scale-105"
            >
              {{ isDescriptionExpanded ? 'Show less' : 'Show more' }}
              <svg
                class="w-4 h-4 transition-transform duration-300"
                :class="isDescriptionExpanded ? 'rotate-180' : ''"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Admin: Student Permissions with Premium Cards -->
        <div
          v-if="isAdmin && 'permissions' in video && video.permissions"
          class="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl transition-all duration-300 hover:border-gray-600/50"
        >
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2 tracking-tight">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Student Access
            <span class="text-sm font-normal text-gray-400">({{ video.permissions.length }})</span>
          </h2>

          <div v-if="video.permissions.length === 0" class="text-center py-12 text-gray-500">
            <svg
              class="w-12 h-12 mx-auto mb-3 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p>No students have access yet</p>
          </div>

          <!-- Premium Grid with Tailwind Effects -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div
              v-for="permission in video.permissions"
              :key="permission.id"
              class="p-4 rounded-xl bg-gray-800/60 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
            >
              <div class="flex items-center gap-3 mb-2">
                <div
                  class="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold shadow-lg"
                >
                  {{ permission.student.name.charAt(0).toUpperCase() }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm truncate text-white">
                    {{ permission.student.name }}
                  </p>
                </div>
              </div>
              <p class="text-xs text-gray-300 truncate">{{ permission.student.email }}</p>
              <div class="mt-2 text-xs text-gray-400 flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {{ formatDate(permission.grantedAt) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { adminVideoAPI, studentVideoAPI } from '@/services/api'
import { useToast } from '@/composables/useToast'
import VideoPlayer from '@/components/video/VideoPlayer.vue'
import type { VideoWithCreator, VideoWithPermission, PermissionWithDetails } from '@/types/api'
import { API_BASE_URL } from '@/utils/api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const videoId = route.params.id as string
const loading = ref(true)
const video = ref<
  (VideoWithCreator & { permissions?: PermissionWithDetails[] }) | VideoWithPermission | null
>(null)
const hasPermission = ref(false)
const canRequestAccess = ref(false)
const requestingAccess = ref(false)
const videoStreamUrl = ref<string | null>(null)
const isDescriptionExpanded = ref(false)

const isAdmin = computed(() => authStore.user?.role === 'admin')

const loadVideoDetails = async () => {
  try {
    loading.value = true

    if (isAdmin.value) {
      const response = await adminVideoAPI.getDetails(videoId)
      video.value = response.video
      hasPermission.value = true
    } else {
      const response = await studentVideoAPI.getDetails(videoId)
      video.value = response.video as VideoWithPermission
      hasPermission.value = (video.value as VideoWithPermission).hasPermission || false

      const accessRequest = (video.value as VideoWithPermission).accessRequest
      canRequestAccess.value = !hasPermission.value && !accessRequest
    }

    if (hasPermission.value) {
      await loadVideoStream()
    }
  } catch (error: any) {
    console.error('Failed to load video:', error)
    toast.error('Failed to Load Video', error.message || 'Could not load video details.')
    router.push('/videos')
  } finally {
    loading.value = false
  }
}

const loadVideoStream = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE_URL}/stream/${videoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to load video stream')
    }

    const blob = await response.blob()
    const videoUrl = URL.createObjectURL(blob)
    videoStreamUrl.value = videoUrl
  } catch (error: any) {
    console.error('Failed to load video stream:', error)
    toast.error('Stream Error', 'Could not load video stream')
  }
}

const requestAccess = async () => {
  try {
    requestingAccess.value = true
    await studentVideoAPI.requestAccess(videoId)
    toast.success('Access Requested', 'Your request has been submitted to the instructor.')
    canRequestAccess.value = false
    await loadVideoDetails()
  } catch (error: any) {
    console.error('Failed to request access:', error)
    toast.error('Request Failed', error.message || 'Could not submit access request.')
  } finally {
    requestingAccess.value = false
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
  loadVideoDetails()
})
</script>

<style scoped>
/* Line clamp utility */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 3;
}

/* Enhanced tap zones */
button {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
</style>
