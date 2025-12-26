<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const form = ref({
  name: '',
  email: '',
  password: '',
})

const loading = ref(false)
const showPassword = ref(false)
const touched = ref({
  name: false,
  email: false,
  password: false,
})

// Password strength computation
const passwordStrength = computed(() => {
  const password = form.value.password
  if (!password) return { score: 0, label: '', color: '' }

  let score = 0

  // Length check
  if (password.length >= 8) score++
  if (password.length >= 12) score++

  // Character variety
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++

  if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' }
  if (score <= 4) return { score, label: 'Fair', color: 'bg-yellow-500' }
  if (score <= 5) return { score, label: 'Good', color: 'bg-blue-500' }
  return { score, label: 'Strong', color: 'bg-green-500' }
})

// Password requirements
const passwordRequirements = computed(() => [
  { met: form.value.password.length >= 6, text: 'At least 6 characters' },
  { met: /[A-Z]/.test(form.value.password), text: 'One uppercase letter' },
  { met: /[0-9]/.test(form.value.password), text: 'One number' },
])

// Field validation states
const nameValid = computed(() => form.value.name.length >= 2)
const emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email))

const validateForm = () => {
  if (form.value.name.length < 2) {
    toast.error('Validation Error', 'Name must be at least 2 characters')
    return false
  }

  if (!emailValid.value) {
    toast.error('Validation Error', 'Please enter a valid email')
    return false
  }

  if (form.value.password.length < 6) {
    toast.error('Validation Error', 'Password must be at least 6 characters')
    return false
  }

  return true
}

async function handleSubmit() {
  // Mark all fields as touched
  Object.keys(touched.value).forEach((key) => {
    touched.value[key as keyof typeof touched.value] = true
  })

  if (!validateForm()) return

  loading.value = true

  // Automatically set role to "student" for all registrations
  const result = await authStore.register({
    name: form.value.name,
    email: form.value.email,
    password: form.value.password,
    role: 'student',
  })

  if (result.success) {
    toast.success('Account Created!', 'Welcome to Course2CEO')
    // Router.push is already handled in the auth store
  } else {
    // Extract error message from the result
    const errorMessage = result.error || 'Registration failed. Please try again.'
    toast.error('Registration Failed', errorMessage)
  }

  loading.value = false
}

function markTouched(field: keyof typeof touched.value) {
  touched.value[field] = true
}
</script>

<template>
  <AuthLayout>
    <!-- Logo -->
    <div class="text-center mb-8">
      <div
        class="mx-auto h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
      <h1 class="text-2xl font-bold text-gray-900">Create your account</h1>
      <p class="mt-2 text-sm text-gray-600">Join us today and start your journey</p>
    </div>

    <!-- Form Card -->
    <div class="py-6">
      <form class="space-y-5" @submit.prevent="handleSubmit">
        <!-- Name Field -->
        <div class="space-y-2">
          <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-4 w-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              id="name"
              v-model="form.name"
              name="name"
              type="text"
              autocomplete="name"
              required
              @blur="markTouched('name')"
              :class="[
                'block w-full pl-10 pr-10 py-3 text-sm text-gray-900 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400',
                touched.name && nameValid
                  ? 'border-green-300 focus:border-green-500'
                  : 'border-gray-200 focus:border-blue-500',
                touched.name && !nameValid ? 'border-red-300 focus:border-red-500' : '',
              ]"
              placeholder="John Doe"
            />
            <div
              v-if="touched.name && nameValid"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <CheckCircleIcon class="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>

        <!-- Email Field -->
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-4 w-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              @blur="markTouched('email')"
              :class="[
                'block w-full pl-10 pr-10 py-3 text-sm text-gray-900 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400',
                touched.email && emailValid
                  ? 'border-green-300 focus:border-green-500'
                  : 'border-gray-200 focus:border-blue-500',
                touched.email && !emailValid ? 'border-red-300 focus:border-red-500' : '',
              ]"
              placeholder="you@example.com"
            />
            <div
              v-if="touched.email && emailValid"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <CheckCircleIcon class="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>

        <!-- Password Field -->
        <div class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-4 w-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              id="password"
              v-model="form.password"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="new-password"
              required
              @blur="markTouched('password')"
              class="block w-full pl-10 pr-10 py-3 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
              placeholder="Create a password"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
              >
                <svg
                  v-if="!showPassword"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Password Strength Meter -->
          <div v-if="form.password" class="mt-2">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs text-gray-600">Password strength:</span>
              <span
                :class="[
                  'text-xs font-medium',
                  passwordStrength.label === 'Weak'
                    ? 'text-red-600'
                    : passwordStrength.label === 'Fair'
                      ? 'text-yellow-600'
                      : passwordStrength.label === 'Good'
                        ? 'text-blue-600'
                        : 'text-green-600',
                ]"
              >
                {{ passwordStrength.label }}
              </span>
            </div>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                :class="[passwordStrength.color, 'h-full transition-all duration-300 ease-out']"
                :style="{ width: `${(passwordStrength.score / 6) * 100}%` }"
              ></div>
            </div>
          </div>

          <!-- Password Requirements -->
          <div v-if="form.password" class="mt-3 space-y-1">
            <p class="text-xs font-medium text-gray-700 mb-2">Password must contain:</p>
            <div
              v-for="(req, index) in passwordRequirements"
              :key="index"
              class="flex items-center text-xs"
            >
              <CheckCircleIcon
                :class="[
                  'h-4 w-4 mr-2 flex-shrink-0',
                  req.met ? 'text-green-500' : 'text-gray-300',
                ]"
              />
              <span :class="req.met ? 'text-gray-700' : 'text-gray-500'">{{ req.text }}</span>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="pt-2">
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                v-if="!loading"
                class="h-5 w-5 text-blue-300 group-hover:text-blue-200 transition-colors duration-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-3 7a7 7 0 1114 0H3.5"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else
                class="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
            {{ loading ? 'Creating account...' : 'Create account' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Footer -->
    <div class="bg-gray-50 px-8 py-6 rounded-b-2xl text-center">
      <p class="text-sm text-gray-600">
        Already have an account? {{ ' ' }}
        <router-link
          to="/login"
          class="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
        >
          Sign in
        </router-link>
      </p>
    </div>
  </AuthLayout>
</template>
