<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'

const showModal = ref(false)
const inputValue = ref('')
const inputError = ref('')
const passwordValue = ref('')
const disabledValue = ref('Cannot edit this field')

const handleButtonClick = () => {
  console.log('Button clicked!')
}

const validateInput = () => {
  if (inputValue.value.length < 3) {
    inputError.value = 'Input must be at least 3 characters'
  } else {
    inputError.value = ''
  }
}
</script>

<template>
  <div class="min-h-screen bg-surface-secondary p-8">
    <div class="max-w-7xl mx-auto space-y-12">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-5xl font-bold text-gradient mb-4">Course2CEO Design System</h1>
        <p class="text-text-secondary text-lg">
          Premium UI components with sophisticated design tokens
        </p>
      </div>

      <!-- Colors Section -->
      <BaseCard>
        <template #header>
          <h2 class="text-2xl font-semibold">Color Palette</h2>
        </template>

        <div class="space-y-6">
          <!-- Brand Colors -->
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-text-primary">Brand Colors</h3>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div class="space-y-2">
                <div class="h-24 rounded-xl bg-brand-primary shadow-lg shadow-brand-primary/20"></div>
                <div class="text-sm">
                  <p class="font-medium text-text-primary">Primary</p>
                  <p class="text-text-secondary">#2563eb</p>
                </div>
              </div>
              <div class="space-y-2">
                <div class="h-24 rounded-xl bg-brand-primary-hover"></div>
                <div class="text-sm">
                  <p class="font-medium text-text-primary">Primary Hover</p>
                  <p class="text-text-secondary">#1d4ed8</p>
                </div>
              </div>
              <div class="space-y-2">
                <div class="h-24 rounded-xl bg-brand-primary-light"></div>
                <div class="text-sm">
                  <p class="font-medium text-text-primary">Primary Light</p>
                  <p class="text-text-secondary">#dbeafe</p>
                </div>
              </div>
              <div class="space-y-2">
                <div class="h-24 rounded-xl bg-brand-accent shadow-lg shadow-brand-accent/20"></div>
                <div class="text-sm">
                  <p class="font-medium text-text-primary">Accent</p>
                  <p class="text-text-secondary">#8b5cf6</p>
                </div>
              </div>
              <div class="space-y-2">
                <div class="h-24 rounded-xl bg-brand-accent-hover"></div>
                <div class="text-sm">
                  <p class="font-medium text-text-primary">Accent Hover</p>
                  <p class="text-text-secondary">#7c3aed</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Semantic Colors -->
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-text-primary">Semantic Colors</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div class="space-y-2">
                <div class="h-24 rounded-xl bg-success shadow-lg shadow-success/20"></div>
                <div class="text-sm">
                  <p class="font-medium text-text-primary">Success</p>
                  <p class="text-text-secondary">#059669</p>
                </div>
              </div>
              <div class="space-y-2">
                <div class="h-24 rounded-xl bg-warning shadow-lg shadow-warning/20"></div>
                <div class="text-sm">
                  <p class="font-medium text-text-primary">Warning</p>
                  <p class="text-text-secondary">#f59e0b</p>
                </div>
              </div>
              <div class="space-y-2">
                <div class="h-24 rounded-xl bg-error shadow-lg shadow-error/20"></div>
                <div class="text-sm">
                  <p class="font-medium text-text-primary">Error</p>
                  <p class="text-text-secondary">#dc2626</p>
                </div>
              </div>
              <div class="space-y-2">
                <div class="h-24 rounded-xl bg-info shadow-lg shadow-info/20"></div>
                <div class="text-sm">
                  <p class="font-medium text-text-primary">Info</p>
                  <p class="text-text-secondary">#0891b2</p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
              <div class="space-y-2">
                <div class="h-24 rounded-xl bg-success-light"></div>
                <div class="text-sm">
                  <p class="font-medium text-text-primary">Success Light</p>
                  <p class="text-text-secondary">#d1fae5</p>
                </div>
              </div>
              <div class="space-y-2">
                <div class="h-24 rounded-xl bg-warning-light"></div>
                <div class="text-sm">
                  <p class="font-medium text-text-primary">Warning Light</p>
                  <p class="text-text-secondary">#fef3c7</p>
                </div>
              </div>
              <div class="space-y-2">
                <div class="h-24 rounded-xl bg-error-light"></div>
                <div class="text-sm">
                  <p class="font-medium text-text-primary">Error Light</p>
                  <p class="text-text-secondary">#fee2e2</p>
                </div>
              </div>
              <div class="space-y-2">
                <div class="h-24 rounded-xl bg-info-light"></div>
                <div class="text-sm">
                  <p class="font-medium text-text-primary">Info Light</p>
                  <p class="text-text-secondary">#cffafe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Typography Section -->
      <BaseCard>
        <template #header>
          <h2 class="text-2xl font-semibold">Typography</h2>
        </template>

        <div class="space-y-4">
          <h1 class="text-5xl font-display font-bold mb-4">Heading 1 - The quick brown fox</h1>
          <h2 class="text-4xl font-display font-semibold mb-4">Heading 2 - The quick brown fox</h2>
          <h3 class="text-3xl font-display font-semibold mb-3">Heading 3 - The quick brown fox</h3>
          <h4 class="text-2xl font-semibold mb-3">Heading 4 - The quick brown fox</h4>
          <h5 class="text-xl font-semibold mb-2">Heading 5 - The quick brown fox</h5>
          <h6 class="text-lg font-semibold mb-2">Heading 6 - The quick brown fox</h6>
          <p class="text-base text-text-primary mb-4">
            Body text - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </BaseCard>

      <!-- Buttons Section -->
      <BaseCard>
        <template #header>
          <h2 class="text-2xl font-semibold">Buttons</h2>
        </template>

        <div class="space-y-6">
          <!-- Variants -->
          <div>
            <h3 class="text-lg font-medium mb-3">Variants</h3>
            <div class="flex flex-wrap gap-3">
              <BaseButton variant="primary" @click="handleButtonClick">Primary Button</BaseButton>
              <BaseButton variant="secondary" @click="handleButtonClick">
                Secondary Button
              </BaseButton>
              <BaseButton variant="ghost" @click="handleButtonClick">Ghost Button</BaseButton>
              <BaseButton variant="danger" @click="handleButtonClick">Danger Button</BaseButton>
            </div>
          </div>

          <!-- Sizes -->
          <div>
            <h3 class="text-lg font-medium mb-3">Sizes</h3>
            <div class="flex flex-wrap items-center gap-3">
              <BaseButton size="sm">Small</BaseButton>
              <BaseButton size="md">Medium</BaseButton>
              <BaseButton size="lg">Large</BaseButton>
            </div>
          </div>

          <!-- States -->
          <div>
            <h3 class="text-lg font-medium mb-3">States</h3>
            <div class="flex flex-wrap gap-3">
              <BaseButton :loading="true">Loading</BaseButton>
              <BaseButton :disabled="true">Disabled</BaseButton>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Inputs Section -->
      <BaseCard>
        <template #header>
          <h2 class="text-2xl font-semibold">Input Fields</h2>
        </template>

        <div class="space-y-6 max-w-md">
          <BaseInput
            v-model="inputValue"
            label="Username"
            placeholder="Enter your username"
            helper-text="Choose a unique username"
            @blur="validateInput"
          />

          <BaseInput
            v-model="inputValue"
            label="Email"
            type="email"
            placeholder="you@example.com"
            :required="true"
            :error="inputError"
          />

          <BaseInput
            v-model="passwordValue"
            label="Password"
            type="password"
            placeholder="••••••••"
            :required="true"
          />

          <BaseInput
            v-model="disabledValue"
            label="Disabled Input"
            placeholder="Cannot edit"
            :disabled="true"
          />
        </div>
      </BaseCard>

      <!-- Badges Section -->
      <BaseCard>
        <template #header>
          <h2 class="text-2xl font-semibold">Badges</h2>
        </template>

        <div class="space-y-4">
          <div class="flex flex-wrap gap-3">
            <BaseBadge variant="success">Unlocked</BaseBadge>
            <BaseBadge variant="warning">Pending</BaseBadge>
            <BaseBadge variant="error">Locked</BaseBadge>
            <BaseBadge variant="info">New</BaseBadge>
            <BaseBadge variant="default">Default</BaseBadge>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <BaseBadge size="sm">Small</BaseBadge>
            <BaseBadge size="md">Medium</BaseBadge>
            <BaseBadge size="lg">Large</BaseBadge>
          </div>
        </div>
      </BaseCard>

      <!-- Modal Section -->
      <BaseCard>
        <template #header>
          <h2 class="text-2xl font-semibold">Modal</h2>
        </template>

        <BaseButton @click="showModal = true">Open Modal</BaseButton>

        <BaseModal v-model="showModal" title="Example Modal" size="md">
          <p class="text-text-secondary">
            This is a modal dialog with a backdrop blur effect and smooth animations. It uses
            HeadlessUI for accessibility.
          </p>

          <template #footer>
            <BaseButton variant="secondary" @click="showModal = false">Cancel</BaseButton>
            <BaseButton variant="primary" @click="showModal = false">Confirm</BaseButton>
          </template>
        </BaseModal>
      </BaseCard>

      <!-- Cards Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BaseCard elevation="sm">
          <h3 class="text-lg font-semibold mb-2">Small Elevation</h3>
          <p class="text-text-secondary text-sm">Card with subtle shadow</p>
        </BaseCard>

        <BaseCard elevation="md">
          <h3 class="text-lg font-semibold mb-2">Medium Elevation</h3>
          <p class="text-text-secondary text-sm">Default card shadow</p>
        </BaseCard>

        <BaseCard elevation="lg">
          <h3 class="text-lg font-semibold mb-2">Large Elevation</h3>
          <p class="text-text-secondary text-sm">Prominent shadow effect</p>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
