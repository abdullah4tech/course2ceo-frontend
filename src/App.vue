<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import LandingLayout from '@/layouts/LandingLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BaseToast from '@/components/ui/BaseToast.vue'
import { useToast } from '@/composables/useToast'

const route = useRoute()
const { toasts, remove } = useToast()

const layout = computed(() => {
  if (route.meta.layout === 'auth') {
    return AuthLayout
  }
  if (route.meta.layout === 'landing') {
    return LandingLayout
  }
  return DashboardLayout
})
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>

  <!-- Toast Container -->
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-3">
    <BaseToast
      v-for="toast in toasts"
      :key="toast.id"
      :type="toast.type"
      :title="toast.title"
      :description="toast.description"
      :duration="toast.duration"
      @close="remove(toast.id)"
    />
  </div>
</template>
