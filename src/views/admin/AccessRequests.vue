<template>
  <div class="w-full space-y-4 sm:space-y-6">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div class="flex-1 min-w-0">
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Access Requests</h1>
        <p class="text-gray-500 text-sm mt-1">Manage student video access permissions</p>
      </div>
      <div class="flex items-center gap-3">
        <BaseButton variant="ghost" size="sm" @click="loadRequests">
          <component :is="ArrowPathIcon" class="w-4 h-4 mr-1.5" />
          Refresh
        </BaseButton>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      <StatCard
        label="Pending"
        :value="pendingRequests.length"
        :icon="ClockIcon"
        variant="warning"
        :loading="loading"
      />
      <StatCard
        label="Approved Today"
        :value="approvedToday"
        :icon="CheckCircleIcon"
        variant="success"
        :loading="loading"
      />
      <StatCard
        label="Total Processed"
        :value="historyRequests.length"
        :icon="ChartBarIcon"
        variant="info"
        :loading="loading"
      />
    </div>

    <!-- Search and Filter Bar -->
    <BaseCard>
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1 relative">
          <MagnifyingGlassIcon
            class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by student name, email, or video title..."
            class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
          />
        </div>

        <!-- Filter -->
        <select
          v-model="filterStatus"
          class="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all bg-white"
        >
          <option value="all">All Requests</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </BaseCard>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"
      ></div>
    </div>

    <!-- Content -->
    <div v-else class="space-y-6">
      <!-- Pending Requests Section -->
      <BaseCard v-if="filteredPendingRequests.length > 0 || filterStatus === 'pending'">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <h2 class="text-xl font-semibold text-gray-900">Pending Requests</h2>
              <BaseBadge variant="warning" class="text-sm">
                {{ filteredPendingRequests.length }}
              </BaseBadge>
            </div>
            <div v-if="filteredPendingRequests.length > 0" class="text-sm text-gray-500">
              {{ filteredPendingRequests.length }} awaiting review
            </div>
          </div>
        </template>

        <div v-if="filteredPendingRequests.length === 0" class="text-center py-16">
          <div
            class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircleIcon class="w-8 h-8 text-green-600" />
          </div>
          <p class="text-lg font-medium text-gray-900 mb-1">All caught up!</p>
          <p class="text-sm text-gray-500">No pending requests at the moment</p>
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="request in filteredPendingRequests"
            :key="request.id"
            class="group p-5 rounded-xl border border-gray-200 hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all duration-200"
          >
            <div class="flex items-start justify-between gap-4">
              <!-- Request Info -->
              <div class="flex-1 space-y-3">
                <div class="flex items-start gap-3">
                  <!-- Avatar -->
                  <div
                    class="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white font-semibold text-lg shrink-0"
                  >
                    {{ request.student.name.charAt(0).toUpperCase() }}
                  </div>

                  <!-- Details -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <h3 class="font-semibold text-gray-900">{{ request.student.name }}</h3>
                      <BaseBadge variant="default" class="text-xs">Student</BaseBadge>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">{{ request.student.email }}</p>

                    <!-- Video Info -->
                    <div
                      class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg group-hover:bg-white transition-colors"
                    >
                      <VideoCameraIcon class="w-5 h-5 text-brand-primary shrink-0" />
                      <div class="min-w-0 flex-1">
                        <p class="text-sm font-medium text-gray-900 truncate">
                          {{ request.video.title }}
                        </p>
                        <p class="text-xs text-gray-500">
                          Requested {{ formatRelativeDate(request.createdAt) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-col gap-2 shrink-0">
                <BaseButton
                  size="sm"
                  variant="primary"
                  :disabled="processingId === request.id"
                  @click="handleApprove(request.id)"
                  class="min-w-[100px]"
                >
                  <CheckCircleIcon v-if="processingId !== request.id" class="w-4 h-4 mr-1.5" />
                  {{ processingId === request.id ? 'Approving...' : 'Approve' }}
                </BaseButton>
                <BaseButton
                  size="sm"
                  variant="danger"
                  :disabled="processingId === request.id"
                  @click="handleReject(request.id)"
                  class="min-w-[100px]"
                >
                  <XCircleIcon v-if="processingId !== request.id" class="w-4 h-4 mr-1.5" />
                  {{ processingId === request.id ? 'Rejecting...' : 'Reject' }}
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Request History -->
      <BaseCard v-if="filteredHistoryRequests.length > 0 || filterStatus !== 'pending'">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900">Request History</h2>
            <div class="text-sm text-gray-500">
              {{ filteredHistoryRequests.length }} processed
              {{ filteredHistoryRequests.length === 1 ? 'request' : 'requests' }}
            </div>
          </div>
        </template>

        <div v-if="filteredHistoryRequests.length === 0" class="text-center py-12">
          <div
            class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <ClockIcon class="w-8 h-8 text-gray-400" />
          </div>
          <p class="text-gray-500">No history available</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th
                  class="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Student
                </th>
                <th
                  class="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Video
                </th>
                <th
                  class="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="request in filteredHistoryRequests"
                :key="request.id"
                class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td class="py-4 px-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium text-sm"
                    >
                      {{ request.student.name.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 text-sm">{{ request.student.name }}</p>
                      <p class="text-xs text-gray-500">{{ request.student.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-4">
                  <div class="flex items-center gap-2">
                    <VideoCameraIcon class="w-4 h-4 text-gray-400 shrink-0" />
                    <span class="text-sm text-gray-900">{{ request.video.title }}</span>
                  </div>
                </td>
                <td class="py-4 px-4">
                  <BaseBadge :variant="request.status === 'approved' ? 'success' : 'error'">
                    {{ request.status }}
                  </BaseBadge>
                </td>
                <td class="py-4 px-4 text-sm text-gray-600">
                  {{ formatDate(request.updatedAt || request.createdAt) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </BaseCard>

      <!-- Empty State (when no requests at all) -->
      <BaseCard v-if="requests.length === 0 && !loading">
        <div class="text-center py-16">
          <div
            class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <ClockIcon class="w-10 h-10 text-gray-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">No Requests Yet</h3>
          <p class="text-gray-500 max-w-md mx-auto">
            When students request access to videos, they'll appear here for your review.
          </p>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { adminPermissionAPI } from '@/services/api'
import { useToast } from '@/composables/useToast'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import StatCard from '@/components/dashboard/StatCard.vue'
import type { AccessRequestWithDetails } from '@/types/api'
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  VideoCameraIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ChartBarIcon,
} from '@heroicons/vue/24/outline'

const toast = useToast()
const loading = ref(true)
const requests = ref<AccessRequestWithDetails[]>([])
const processingId = ref<string | null>(null)
const searchQuery = ref('')
const filterStatus = ref<'all' | 'pending' | 'approved' | 'rejected'>('all')

// Computed: Filter requests by search and status
const filteredRequests = computed(() => {
  let filtered = requests.value

  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (r) =>
        r.student.name.toLowerCase().includes(query) ||
        r.student.email.toLowerCase().includes(query) ||
        r.video.title.toLowerCase().includes(query),
    )
  }

  // Apply status filter
  if (filterStatus.value !== 'all') {
    filtered = filtered.filter((r) => r.status === filterStatus.value)
  }

  return filtered
})

const filteredPendingRequests = computed(() =>
  filteredRequests.value.filter((r) => r.status === 'pending'),
)

const filteredHistoryRequests = computed(() =>
  filteredRequests.value
    .filter((r) => r.status !== 'pending')
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt).getTime() -
        new Date(a.updatedAt || a.createdAt).getTime(),
    ),
)

const pendingRequests = computed(() => requests.value.filter((r) => r.status === 'pending'))

const historyRequests = computed(() => requests.value.filter((r) => r.status !== 'pending'))

// Approved today count
const approvedToday = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return requests.value.filter((r) => {
    if (r.status !== 'approved' || !r.updatedAt) return false
    const updatedDate = new Date(r.updatedAt)
    return updatedDate >= today
  }).length
})

const loadRequests = async () => {
  try {
    loading.value = true
    const response = await adminPermissionAPI.getRequests()
    requests.value = response.requests
  } catch (error: any) {
    console.error('Failed to load requests:', error)
    toast.error('Error', 'Failed to load access requests')
  } finally {
    loading.value = false
  }
}

const handleApprove = async (requestId: string) => {
  try {
    processingId.value = requestId
    await adminPermissionAPI.approve(requestId)
    toast.success('Approved!', 'Student access has been granted')
    await loadRequests()
  } catch (error: any) {
    console.error('Failed to approve request:', error)
    toast.error('Error', error.message || 'Failed to approve request')
  } finally {
    processingId.value = null
  }
}

const handleReject = async (requestId: string) => {
  try {
    processingId.value = requestId
    await adminPermissionAPI.reject(requestId)
    toast.success('Rejected', 'Access request has been denied')
    await loadRequests()
  } catch (error: any) {
    console.error('Failed to reject request:', error)
    toast.error('Error', error.message || 'Failed to reject request')
  } finally {
    processingId.value = null
  }
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(dateString)
}

onMounted(() => {
  loadRequests()
})
</script>
