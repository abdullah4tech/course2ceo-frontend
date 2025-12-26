<template>
  <div class="p-8">
    <div class="max-w-7xl mx-auto space-y-8">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold text-gradient mb-2">My Requests</h1>
          <p class="text-text-secondary text-lg">Track the status of your access requests</p>
        </div>
        <BaseButton variant="primary" @click="$router.push('/videos')"> Browse Videos </BaseButton>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"
        ></div>
      </div>

      <!-- Content -->
      <div v-else>
        <BaseCard>
          <div v-if="requests.length === 0" class="text-center py-12 text-gray-500">
            <p class="text-lg">You haven't made any access requests yet.</p>
            <BaseButton variant="ghost" class="mt-4" @click="$router.push('/videos')">
              Browse Library
            </BaseButton>
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-border-light">
                  <th class="text-left py-4 px-4 text-text-secondary font-medium text-sm">Video</th>
                  <th class="text-left py-4 px-4 text-text-secondary font-medium text-sm">
                    Status
                  </th>
                  <th class="text-left py-4 px-4 text-text-secondary font-medium text-sm">
                    Requested Date
                  </th>
                  <th class="text-left py-4 px-4 text-text-secondary font-medium text-sm">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="request in requests"
                  :key="request.id"
                  class="border-b border-border-light hover:bg-surface-secondary transition-colors"
                >
                  <td class="py-4 px-4">
                    <div class="flex items-center gap-3">
                      <div class="h-10 w-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <img
                          v-if="request.video.thumbnailUrl"
                          :src="request.video.thumbnailUrl"
                          class="w-full h-full object-cover"
                        />
                        <div v-else class="w-full h-full flex items-center justify-center text-xs">
                          🎥
                        </div>
                      </div>
                      <span class="font-medium text-text-primary">{{ request.video.title }}</span>
                    </div>
                  </td>
                  <td class="py-4 px-4">
                    <BaseBadge
                      :variant="
                        request.status === 'approved'
                          ? 'success'
                          : request.status === 'rejected'
                            ? 'error'
                            : 'warning'
                      "
                    >
                      {{ request.status === 'approved' ? 'Access Granted' : request.status }}
                    </BaseBadge>
                  </td>
                  <td class="py-4 px-4 text-text-secondary">
                    {{ formatDate(request.createdAt) }}
                  </td>
                  <td class="py-4 px-4 text-text-secondary">
                    {{ formatDate(request.updatedAt || request.createdAt) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { studentVideoAPI } from '@/services/api'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import type { AccessRequestWithDetails } from '@/types/api'

const loading = ref(true)
const requests = ref<AccessRequestWithDetails[]>([])

const loadRequests = async () => {
  try {
    loading.value = true
    const response = await studentVideoAPI.getMyRequests()
    requests.value = response.requests
  } catch (error) {
    console.error('Failed to load requests:', error)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

onMounted(() => {
  loadRequests()
})
</script>
