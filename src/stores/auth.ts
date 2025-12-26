// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/utils/api'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'student'
  avatar?: string
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const isAuthenticated = ref(!!localStorage.getItem('token'))

  const isAdmin = computed(() => user.value?.role === 'admin')

  async function login(email: string, password: string) {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token: authToken, user: userData } = response.data

      token.value = authToken
      user.value = userData
      isAuthenticated.value = true
      localStorage.setItem('token', authToken)

      const redirectPath = userData.role === 'admin' ? '/admin' : '/dashboard'
      router.push(redirectPath)

      return { success: true }
    } catch (error: any) {
      console.error('Login failed:', error)
      // Extract error from response.data.error based on API structure
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Login failed. Please try again.'
      return {
        success: false,
        error: errorMessage,
      }
    }
  }

  async function register(userData: {
    name: string
    email: string
    password: string
    role?: 'admin' | 'student'
  }) {
    try {
      // Ensure role is always set, default to 'student'
      const registrationData = {
        ...userData,
        role: userData.role || 'student',
      }

      const response = await api.post('/auth/register', registrationData)
      const { token: authToken, user: registeredUser } = response.data

      token.value = authToken
      user.value = registeredUser
      isAuthenticated.value = true
      localStorage.setItem('token', authToken)

      const redirectPath = registeredUser.role === 'admin' ? '/admin' : '/dashboard'
      router.push(redirectPath)

      return { success: true }
    } catch (error: any) {
      console.error('Registration failed:', error)
      // Extract error from response.data.error based on API structure
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Registration failed. Please try again.'
      return {
        success: false,
        error: errorMessage,
      }
    }
  }

  async function fetchUser() {
    if (!token.value) return

    try {
      const response = await api.get('/auth/me')
      user.value = response.data.user
    } catch (error: any) {
      console.error('Failed to fetch user:', error)
      if (error.response?.status === 401) {
        logout()
      }
    }
  }

  function logout() {
    user.value = null
    token.value = null
    isAuthenticated.value = false
    localStorage.removeItem('token')
    router.push('/login')
  }

  // Initialize user if token exists
  if (token.value && !user.value) {
    fetchUser()
  }

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    fetchUser,
  }
})
