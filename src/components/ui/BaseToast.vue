<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface ToastProps {
  type?: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
  duration?: number
}

const props = withDefaults(defineProps<ToastProps>(), {
  type: 'info',
  duration: 5000,
})

const emit = defineEmits<{
  close: []
}>()

const show = ref(false)

onMounted(() => {
  show.value = true

  if (props.duration > 0) {
    setTimeout(() => {
      handleClose()
    }, props.duration)
  }
})

const handleClose = () => {
  show.value = false
  setTimeout(() => {
    emit('close')
  }, 200)
}

const iconMap = {
  success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
  </svg>`,
  error: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
  </svg>`,
  warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
    <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
  </svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
  </svg>`,
}

const colorMap = {
  success: 'border-success text-success',
  error: 'border-error text-error',
  warning: 'border-warning text-warning',
  info: 'border-info text-info',
}

const bgMap = {
  success: 'bg-success-light',
  error: 'bg-error-light',
  warning: 'bg-warning-light',
  info: 'bg-info-light',
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-full opacity-0"
  >
    <div
      v-if="show"
      class="w-[360px] min-h-[64px] p-4 bg-surface-elevated border rounded-lg shadow-lg backdrop-blur-xl flex items-start gap-3"
      :class="colorMap[type]"
    >
      <!-- Icon -->
      <div class="flex-shrink-0 p-2 rounded-md" :class="bgMap[type]">
        <div v-html="iconMap[type]" />
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold text-text-primary">{{ title }}</p>
        <p v-if="description" class="mt-1 text-xs text-text-secondary">{{ description }}</p>
      </div>

      <!-- Close Button -->
      <button
        type="button"
        class="flex-shrink-0 p-1 rounded hover:bg-surface-secondary transition-colors duration-fast"
        @click="handleClose"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-4 h-4 text-text-secondary"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Transition>
</template>
