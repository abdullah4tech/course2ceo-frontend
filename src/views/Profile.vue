<template>
  <div class="w-full space-y-4 sm:space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex-1 min-w-0">
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900">My Profile</h1>
        <p class="text-sm text-gray-500 mt-1">Manage your account settings and preferences</p>
      </div>
    </div>

    <!-- Profile Information -->
    <div class="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
      <div class="px-4 sm:px-8 pt-4 sm:pt-6 pb-2 border-b border-gray-100">
        <h2 class="text-base sm:text-lg font-semibold text-gray-900">Profile Information</h2>
      </div>

      <form @submit.prevent="handleSave" class="p-4 sm:p-8 space-y-4 sm:space-y-6">
        <!-- Rest of the form content -->
      </form>
    </div>

    <!-- Change Password -->
    <div class="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
      <div class="px-4 sm:px-8 pt-4 sm:pt-6 pb-2 border-b border-gray-100">
        <h2 class="text-base sm:text-lg font-semibold text-gray-900">Change Password</h2>
      </div>

      <form
        @submit.prevent="handlePasswordChange"
        class="p-4 sm:p-8 space-y-4 sm:space-y-6 max-w-2xl"
      >
        <!-- Password form content -->
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
// import { useToast } from 'vue-toastification'
import {
  UserIcon,
  UserGroupIcon,
  EnvelopeIcon,
  PencilSquareIcon,
  PencilIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  CheckCircleIcon,
} from '@heroicons/vue/24/outline'

// const toast = useToast()
const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  console.log(`${type === 'success' ? '✅' : '❌'} ${message}`)
  // In a real app, you would use the toast notification here
  // toast[type](message)
}

// Refs
const fileInput = ref<HTMLInputElement | null>(null)
const saving = ref(false)
const changingPassword = ref(false)
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmNewPassword = ref(false)

const profile = reactive({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  bio: 'Aspiring entrepreneur learning to code',
})

const passwordForm = reactive({
  current: '',
  new: '',
  confirm: '',
})

const passwordMismatch = computed(() => {
  return passwordForm.new && passwordForm.confirm && passwordForm.new !== passwordForm.confirm
})

const initials = computed(() => {
  return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase()
})

const handleAvatarButtonClick = () => {
  fileInput.value?.click()
}

const handleSave = async () => {
  saving.value = true
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    showToast('Profile updated successfully', 'success')
  } catch (error) {
    console.error('Save failed:', error)
    showToast('Failed to update profile. Please try again.', 'error')
  } finally {
    saving.value = false
  }
}

const handlePasswordChange = async () => {
  if (passwordMismatch.value) {
    showToast('Passwords do not match', 'error')
    return
  }

  changingPassword.value = true
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form
    passwordForm.current = ''
    passwordForm.new = ''
    passwordForm.confirm = ''

    // Show success message
    showToast('Password updated successfully', 'success')
  } catch (error) {
    console.error('Password change failed:', error)
    showToast('Failed to update password. Please try again.', 'error')
  } finally {
    changingPassword.value = false
  }
}

const handleAvatarChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      showToast('File size should be less than 2MB', 'error')
      return
    }

    // Here you would typically upload the file to your server
    // For now, we'll just show a success message
    showToast('Avatar updated successfully', 'success')

    // Reset the input
    input.value = ''
  }
}

const resetForm = () => {
  // Reset to original values
  profile.firstName = 'John'
  profile.lastName = 'Doe'
  profile.email = 'john.doe@example.com'
  profile.bio = 'Aspiring entrepreneur learning to code'
}
</script>
