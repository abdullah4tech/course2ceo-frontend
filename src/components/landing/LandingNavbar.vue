<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = [
  { name: 'Features', href: '#features' },
  { name: 'Courses', href: '#courses' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>


<template>
  <nav
    class="w-full transition-all duration-300"
    :class="{ 'shadow-md': isScrolled }"
  >
    <div class="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <router-link to="/" class="text-2xl font-bold text-landing-text-main tracking-tight">
          creator2ceo
        </router-link>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-8">
        <a
          v-for="item in navItems"
          :key="item.name"
          :href="item.href"
          class="text-landing-text-body hover:text-landing-blue font-medium transition-colors"
        >
          {{ item.name }}
        </a>
      </div>

      <!-- Auth Buttons -->
      <div class="hidden md:flex items-center gap-6">
        <router-link
          to="/login"
          class="text-landing-text-main font-medium hover:text-landing-blue transition-colors"
        >
          Sign In
        </router-link>
        <router-link
          to="/register"
          class="bg-landing-blue text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
        >
          Get Started
        </router-link>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="md:hidden text-landing-text-main"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-t border-gray-100 px-6 py-4">
      <div class="flex flex-col gap-4">
        <a
          v-for="item in navItems"
          :key="item.name"
          :href="item.href"
          class="text-landing-text-body hover:text-landing-blue font-medium"
        >
          {{ item.name }}
        </a>
        <div class="h-px bg-gray-100 my-2"></div>
        <router-link to="/login" class="text-landing-text-main font-medium"> Sign In </router-link>
        <router-link
          to="/register"
          class="bg-landing-blue text-white px-6 py-2.5 rounded-lg font-medium text-center"
        >
          Get Started
        </router-link>
      </div>
    </div>
  </nav>
</template>

