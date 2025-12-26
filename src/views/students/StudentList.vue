<template>
  <div class="w-full space-y-4 sm:space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex-1 min-w-0">
        <h1 class="text-3xl sm:text-4xl font-bold text-gradient mb-2">Students</h1>
        <p class="text-text-secondary text-base sm:text-lg">Manage and track student progress</p>
      </div>
      <BaseButton variant="primary" class="w-full sm:w-auto">Add Student </BaseButton>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
      <BaseCard elevation="md">
        <p class="text-text-secondary text-sm font-medium">Total Students</p>
        <p class="text-3xl font-bold text-text-primary mt-1">{{ stats.total }}</p>
      </BaseCard>
      <BaseCard elevation="md">
        <p class="text-text-secondary text-sm font-medium">Active This Week</p>
        <p class="text-3xl font-bold text-text-primary mt-1">{{ stats.active }}</p>
      </BaseCard>
      <BaseCard elevation="md">
        <p class="text-text-secondary text-sm font-medium">Avg Completion</p>
        <p class="text-3xl font-bold text-text-primary mt-1">{{ stats.avgCompletion }}%</p>
      </BaseCard>
      <BaseCard elevation="md">
        <p class="text-text-secondary text-sm font-medium">New This Month</p>
        <p class="text-3xl font-bold text-text-primary mt-1">{{ stats.newThisMonth }}</p>
      </BaseCard>
    </div>

    <!-- Student Table -->
    <BaseCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-semibold">All Students</h2>
          <BaseInput v-model="searchQuery" placeholder="Search students..." class="max-w-xs" />
        </div>
      </template>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-border-light">
              <th class="text-left py-4 px-4 text-text-secondary font-medium text-sm">Student</th>
              <th class="text-left py-4 px-4 text-text-secondary font-medium text-sm">Email</th>
              <th class="text-left py-4 px-4 text-text-secondary font-medium text-sm">Progress</th>
              <th class="text-left py-4 px-4 text-text-secondary font-medium text-sm">Status</th>
              <th class="text-left py-4 px-4 text-text-secondary font-medium text-sm">Joined</th>
              <th class="text-left py-4 px-4 text-text-secondary font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="student in filteredStudents"
              :key="student.id"
              class="border-b border-border-light hover:bg-surface-secondary transition-colors"
            >
              <td class="py-4 px-4">
                <div class="flex items-center gap-3">
                  <div
                    class="h-10 w-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white font-semibold"
                  >
                    {{ getInitials(student.name) }}
                  </div>
                  <span class="font-medium text-text-primary">{{ student.name }}</span>
                </div>
              </td>
              <td class="py-4 px-4 text-text-secondary">{{ student.email }}</td>
              <td class="py-4 px-4">
                <div class="flex items-center gap-2">
                  <div
                    class="flex-1 h-2 bg-surface-secondary rounded-full overflow-hidden max-w-[100px]"
                  >
                    <div class="h-full bg-brand-primary transition-all" style="width: 0%" />
                  </div>
                  <span class="text-sm text-text-secondary">0%</span>
                </div>
              </td>
              <td class="py-4 px-4">
                <BaseBadge variant="success">Active </BaseBadge>
              </td>
              <td class="py-4 px-4 text-text-secondary">{{ formatDate(student.createdAt) }}</td>
              <td class="py-4 px-4">
                <BaseButton variant="ghost" size="sm">View Details </BaseButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { adminVideoAPI } from '@/services/api'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import type { User } from '@/types/api'

const searchQuery = ref('')
const loading = ref(true)
const students = ref<User[]>([])

const stats = computed(() => ({
  total: students.value.length,
  active: students.value.length, // Placeholder as we don't have active status
  avgCompletion: 0, // Placeholder
  newThisMonth: students.value.filter((s) => {
    const date = new Date(s.createdAt)
    const now = new Date()
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }).length,
}))

const filteredStudents = computed(() => {
  if (!searchQuery.value) return students.value

  const query = searchQuery.value.toLowerCase()
  return students.value.filter(
    (student) =>
      student.name.toLowerCase().includes(query) || student.email.toLowerCase().includes(query),
  )
})

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const loadStudents = async () => {
  try {
    loading.value = true
    const response = await adminVideoAPI.getStudents()
    students.value = response.students
  } catch (error) {
    console.error('Failed to load students:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadStudents()
})
</script>
