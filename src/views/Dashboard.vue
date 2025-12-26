<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import StatCard from '@/components/dashboard/StatCard.vue'
import ActivityFeed from '@/components/dashboard/ActivityFeed.vue'
import DashboardChart from '@/components/dashboard/DashboardChart.vue'
import { dashboardAPI, adminPermissionAPI, studentVideoAPI, notificationAPI } from '@/services/api'
import type {
  DashboardActivity,
  NotificationWithDetails,
  AccessRequestWithDetails,
} from '@/types/api'
import {
  VideoCameraIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  LockOpenIcon,
  EyeIcon,
  ArrowUpTrayIcon,
  DocumentTextIcon,
  UserCircleIcon,
  BellIcon,
  BellSlashIcon,
  XCircleIcon,
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()

// Reactive State
const statsLoading = ref(true)
const activitiesLoading = ref(true)
const notificationsLoading = ref(true)
const currentTime = ref('')
let timeInterval: ReturnType<typeof setInterval> | null = null

const adminStats = ref({
  totalVideos: 0,
  totalStudents: 0,
  pendingRequests: 0,
  activePermissions: 0,
})

const studentStats = ref({
  availableVideos: 0,
  pendingRequests: 0,
  grantedAccess: 0,
  recentlyWatched: 0,
})

const activities = ref<DashboardActivity[]>([])
const recentNotifications = ref<NotificationWithDetails[]>([])
const unreadCount = ref(0)

// Computed Properties
const isAdmin = computed(() => authStore.user?.role === 'admin')
const userName = computed(() => authStore.user?.name || 'User')
const currentDate = computed(() =>
  new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
)

// Update time every second
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
}

const heroMessage = computed(() => {
  if (isAdmin.value) {
    return "Here is what's happening with your platform today."
  }
  return 'Ready to continue your learning journey?'
})

const primaryActionLabel = computed(() => (isAdmin.value ? 'View Reports' : 'Browse Videos'))

const handlePrimaryAction = () => {
  if (isAdmin.value) {
    router.push('/admin/reports') // Or wherever reports go
  } else {
    router.push('/videos')
  }
}

const statistics = computed(() => {
  if (isAdmin.value) {
    return [
      {
        label: 'Total Videos',
        value: adminStats.value.totalVideos,
        icon: VideoCameraIcon,
        variant: 'primary' as const,
        trend: 12,
      },
      {
        label: 'Total Students',
        value: adminStats.value.totalStudents,
        icon: UserGroupIcon,
        variant: 'accent' as const,
        trend: 5,
      },
      {
        label: 'Pending Requests',
        value: adminStats.value.pendingRequests,
        icon: ClockIcon,
        variant: 'warning' as const,
        trend: -2,
      },
      {
        label: 'Active Permissions',
        value: adminStats.value.activePermissions,
        icon: CheckCircleIcon,
        variant: 'success' as const,
        trend: 8,
      },
    ]
  } else {
    return [
      {
        label: 'Available Videos',
        value: studentStats.value.availableVideos,
        icon: PlayCircleIcon,
        variant: 'primary' as const,
        trend: 0,
      },
      {
        label: 'Granted Access',
        value: studentStats.value.grantedAccess,
        icon: LockOpenIcon,
        variant: 'success' as const,
        trend: 0,
      },
      {
        label: 'Pending Requests',
        value: studentStats.value.pendingRequests,
        icon: ClockIcon,
        variant: 'warning' as const,
        trend: 0,
      },
      {
        label: 'Recently Watched',
        value: studentStats.value.recentlyWatched,
        icon: EyeIcon,
        variant: 'info' as const,
        trend: 0,
      },
    ]
  }
})

const quickActions = computed(() => {
  if (isAdmin.value) {
    return [
      {
        label: 'Upload Video',
        icon: ArrowUpTrayIcon,
        variant: 'primary' as const,
        onClick: () => router.push('/videos/upload'),
      },
      {
        label: 'Manage Students',
        icon: UserGroupIcon,
        onClick: () => router.push('/students'),
      },
      {
        label: 'Access Requests',
        icon: LockOpenIcon,
        onClick: () => router.push('/admin/requests'),
      },
    ]
  } else {
    return [
      {
        label: 'Browse Videos',
        icon: PlayCircleIcon,
        variant: 'primary' as const,
        onClick: () => router.push('/videos'),
      },
      {
        label: 'My Requests',
        icon: DocumentTextIcon,
        onClick: () => router.push('/student/requests'),
      },
      {
        label: 'My Profile',
        icon: UserCircleIcon,
        onClick: () => router.push('/profile'),
      },
    ]
  }
})

// Methods
const loadAdminDashboard = async () => {
  try {
    statsLoading.value = true
    const stats = await dashboardAPI.getAdminStats()
    adminStats.value = stats

    notificationsLoading.value = true
    const [allNotifications, unread] = await Promise.all([
      notificationAPI.getAll(),
      notificationAPI.getUnread(),
    ])
    recentNotifications.value = allNotifications.notifications
    unreadCount.value = unread.count

    activitiesLoading.value = true
    const requests = await adminPermissionAPI.getRequests()
    activities.value = convertRequestsToActivities(requests.requests)
  } catch (error) {
    console.error('Failed to load admin dashboard:', error)
  } finally {
    statsLoading.value = false
    activitiesLoading.value = false
    notificationsLoading.value = false
  }
}

const loadStudentDashboard = async () => {
  try {
    statsLoading.value = true
    const stats = await dashboardAPI.getStudentStats()
    studentStats.value = stats

    activitiesLoading.value = true
    const requests = await studentVideoAPI.getMyRequests()
    activities.value = convertStudentRequestsToActivities(requests.requests)
  } catch (error) {
    console.error('Failed to load student dashboard:', error)
  } finally {
    statsLoading.value = false
    activitiesLoading.value = false
  }
}

const convertRequestsToActivities = (requests: AccessRequestWithDetails[]): DashboardActivity[] => {
  return requests.slice(0, 10).map((request) => ({
    id: request.id,
    type: 'access_request' as const,
    title: `Request from ${request.student.name}`,
    description: request.video.title,
    timestamp: request.createdAt,
    icon:
      request.status === 'pending'
        ? ClockIcon
        : request.status === 'approved'
          ? CheckCircleIcon
          : XCircleIcon,
    status: request.status,
    user: request.student,
  }))
}

const convertStudentRequestsToActivities = (
  requests: AccessRequestWithDetails[],
): DashboardActivity[] => {
  return requests.slice(0, 10).map((request) => ({
    id: request.id,
    type: request.status === 'approved' ? 'permission_granted' : ('access_request' as const),
    title: request.status === 'approved' ? 'Access Granted' : 'Access Requested',
    description: request.video.title,
    timestamp: request.updatedAt || request.createdAt,
    icon:
      request.status === 'pending'
        ? ClockIcon
        : request.status === 'approved'
          ? CheckCircleIcon
          : XCircleIcon,
    status: request.status,
  }))
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  return date.toLocaleDateString()
}

const handleNotificationClick = (notification: NotificationWithDetails) => {
  if (notification.relatedRequestId) {
    router.push(`/admin/requests?highlight=${notification.relatedRequestId}`)
  }
}

const handleActivityClick = (activity: DashboardActivity) => {
  if (isAdmin.value) {
    router.push('/admin/requests')
  } else {
    router.push('/student/requests')
  }
}

onMounted(() => {
  // Initialize time and start interval
  updateTime()
  timeInterval = setInterval(updateTime, 1000)

  if (isAdmin.value) {
    loadAdminDashboard()
  } else {
    loadStudentDashboard()
  }
})

onUnmounted(() => {
  // Clean up interval
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<template>
  <div class="min-h-full bg-transparent">
    <div class="w-full space-y-4 sm:space-y-6">
      <!-- Header -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div class="flex-1 min-w-0">
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
          <p class="text-gray-500 text-sm mt-1">Overview of your platform activity</p>
        </div>
        <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <!-- Time & Date Display - Responsive -->
          <div class="hidden md:flex items-center gap-3 lg:gap-4">
            <!-- Digital Clock -->
            <div class="flex flex-col items-end">
              <span
                class="font-mono text-2xl lg:text-3xl font-bold text-gray-800 tracking-tight tabular-nums leading-none"
              >
                {{ currentTime }}
              </span>
              <span class="text-xs text-gray-400 uppercase tracking-wider mt-0.5">Live Time</span>
            </div>

            <!-- Elegant Divider -->
            <div
              class="h-10 lg:h-12 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"
            ></div>

            <!-- Date -->
            <div class="flex flex-col">
              <span class="text-sm font-semibold text-gray-700 leading-none">
                {{ new Date().toLocaleDateString('en-US', { weekday: 'short' }) }}
              </span>
              <span
                class="text-xl lg:text-2xl font-bold text-gray-800 tracking-tight leading-none mt-1"
              >
                {{ new Date().getDate() }}
              </span>
              <span class="text-xs text-gray-500 uppercase tracking-wide">
                {{ new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }}
              </span>
            </div>
          </div>

          <BaseButton
            v-if="isAdmin"
            variant="primary"
            size="sm"
            @click="router.push('/videos/upload')"
          >
            <span class="mr-2">+</span> Upload Video
          </BaseButton>
        </div>
      </div>

      <!-- Bento Grid Layout -->
      <div class="space-y-6">
        <!-- Welcome Card (Full width) -->
        <div
          class="bg-gradient-to-br from-brand-primary to-brand-accent rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg group"
        >
          <div class="relative z-10 h-full flex flex-col justify-center">
            <h2 class="text-2xl sm:text-3xl font-bold mb-2 text-white">
              Welcome back, {{ userName }}!
            </h2>
            <p class="text-white/80 text-base sm:text-lg max-w-md mb-4 sm:mb-6">
              {{ heroMessage }}
            </p>
            <div class="flex gap-3">
              <button
                class="bg-white text-brand-primary px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors"
                @click="handlePrimaryAction"
              >
                {{ primaryActionLabel }}
              </button>
            </div>
          </div>
          <!-- Decorative circles -->
          <div
            class="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-110"
          />
          <div
            class="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10"
          />
        </div>

        <!-- Stats Cards Grid (responsive) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            v-for="stat in statistics"
            :key="stat.label"
            v-bind="stat"
            :loading="statsLoading"
          />
        </div>

        <!-- Quick Actions (Responsive) -->
        <div class="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div class="w-full">
            <div class="text-center mb-4 sm:mb-6">
              <h3 class="font-bold text-gray-900 text-lg sm:text-xl">Quick Actions</h3>
              <p class="text-gray-500 text-sm mt-1">Get started with these common tasks</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <button
                v-for="action in quickActions"
                :key="action.label"
                class="flex flex-col items-center gap-3 p-6 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200 hover:shadow-md group text-center"
                @click="action.onClick"
              >
                <div
                  class="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200"
                  :class="
                    action.variant === 'primary'
                      ? 'bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-primary/30'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                  "
                >
                  <component :is="action.icon" class="w-7 h-7" />
                </div>
                <div>
                  <p class="font-semibold text-gray-900 text-sm">{{ action.label }}</p>
                  <p class="text-xs text-gray-500 mt-1">Quick access</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 2px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>
