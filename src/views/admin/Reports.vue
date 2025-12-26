<template>
  <div class="p-8">
    <div class="max-w-7xl mx-auto space-y-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold text-gradient mb-2">Reports & Analytics</h1>
          <p class="text-text-secondary text-lg">Platform usage and performance insights</p>
        </div>
      </div>

      <BaseCard>
        <div class="text-center py-16">
          <div class="text-6xl mb-4">📊</div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
          <p class="text-gray-500 max-w-md mx-auto">
            Detailed analytics and reporting features are currently under development. Check back
            later for updates!
          </p>
          <BaseButton variant="primary" class="mt-8" @click="$router.push('/dashboard')">
            Return to Dashboard
          </BaseButton>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
</script>
