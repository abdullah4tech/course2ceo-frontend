<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import type { ModalProps } from '@/types'
import { computed } from 'vue'

const props = withDefaults(defineProps<ModalProps>(), {
  size: 'md',
  closeOnBackdrop: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  }
  return sizes[props.size]
})

const closeModal = () => {
  if (props.closeOnBackdrop) {
    emit('update:modelValue', false)
  }
}

const handleClose = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog as="div" class="relative z-50" @close="closeModal">
      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="duration-200 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-150 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      </TransitionChild>

      <!-- Modal Container -->
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              :class="[
                'w-full transform overflow-hidden rounded-xl bg-surface-elevated shadow-2xl transition-all',
                sizeClasses,
              ]"
            >
              <!-- Header -->
              <div
                v-if="title || $slots.header"
                class="flex items-center justify-between px-8 py-6 border-b border-border-light"
              >
                <DialogTitle v-if="title" class="text-2xl font-semibold text-text-primary">
                  {{ title }}
                </DialogTitle>
                <slot v-else name="header" />

                <!-- Close Button -->
                <button
                  type="button"
                  class="rounded-md p-2 text-text-secondary hover:bg-surface-secondary transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  @click="handleClose"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Body -->
              <div class="px-8 py-8 max-h-[70vh] overflow-y-auto">
                <slot />
              </div>

              <!-- Footer -->
              <div
                v-if="$slots.footer"
                class="flex items-center justify-end gap-3 px-8 py-6 border-t border-border-light"
              >
                <slot name="footer" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
