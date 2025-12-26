<template>
  <div class="min-h-screen flex items-center justify-center bg-surface-secondary p-4">
    <div class="text-center max-w-lg">
      <div class="text-8xl font-bold text-gradient mb-4">404</div>
      <h1 class="text-3xl font-bold text-text-primary mb-4">Page Not Found</h1>
      <p class="text-text-secondary text-lg mb-8">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <div class="flex gap-4 justify-center">
        <BaseButton variant="primary" @click="goHome"> Go to Dashboard </BaseButton>
        <BaseButton variant="secondary" @click="goBack"> Go Back </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()

const goHome = () => {
  router.push('/dashboard')
}

const goBack = () => {
  router.back()
}
</script>
