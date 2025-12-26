<script setup lang="ts">
import type { InputProps } from '@/types'
import { computed, useAttrs } from 'vue'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  required: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const attrs = useAttrs()

const inputClasses = computed(() => {
  const base =
    'w-full h-12 px-4 py-3 text-base text-text-primary bg-surface-primary border rounded-md transition-all duration-fast placeholder:text-text-tertiary focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60'

  if (props.error) {
    return `${base} border-2 border-error focus:border-error focus:ring-4 focus:ring-error/10`
  }

  return `${base} border-1.5 border-border-medium focus:border-2 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10`
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" class="block mb-2 text-sm font-medium text-text-primary">
      {{ label }}
      <span v-if="required" class="text-error ml-1">*</span>
    </label>

    <!-- Input Field -->
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :class="inputClasses"
      v-bind="attrs"
      @input="handleInput"
    />

    <!-- Error Message -->
    <div v-if="error" class="flex items-center gap-1 mt-2 text-xs text-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-3.5 h-3.5"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
          clip-rule="evenodd"
        />
      </svg>
      <span>{{ error }}</span>
    </div>

    <!-- Helper Text -->
    <p v-else-if="helperText" class="mt-2 text-xs text-text-tertiary">
      {{ helperText }}
    </p>
  </div>
</template>
