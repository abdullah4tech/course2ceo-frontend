<template>
  <div class="min-h-screen bg-[#F8FAFC]">
    <!-- Sidebar - Collapsible -->
    <aside
      class="hidden md:block fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out"
      :class="sidebarCollapsed ? 'w-16' : 'w-72'"
    >
      <div
        class="flex flex-col h-full bg-white border-r border-slate-200/60 shadow-[1px_0_0_0_rgba(0,0,0,0.05)]"
      >
        <!-- Logo Section -->
        <div
          class="h-20 flex items-center border-b border-slate-100 flex-shrink-0 transition-all duration-300"
          :class="sidebarCollapsed ? 'px-4 justify-center' : 'px-8'"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-accent flex items-center justify-center shadow-lg shadow-brand-primary/20"
            >
              <VideoCameraIcon class="w-6 h-6 text-white" />
            </div>
            <h1
              v-if="!sidebarCollapsed"
              class="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight transition-opacity duration-300"
            >
              Course2CEO
            </h1>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex-1 flex flex-col pt-6 pb-4 overflow-y-auto custom-scrollbar">
          <nav class="flex-1 px-4 space-y-1.5">
            <router-link
              v-for="item in navItems"
              :key="item.name"
              :to="item.href"
              class="group flex items-center py-3 text-sm font-medium rounded-xl transition-all duration-200"
              :class="[
                sidebarCollapsed ? 'px-3 justify-center' : 'px-4',
                $route.path.startsWith(item.href)
                  ? 'bg-brand-primary/5 text-brand-primary shadow-sm shadow-brand-primary/5'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900',
              ]"
              :title="sidebarCollapsed ? item.name : ''"
            >
              <component
                :is="item.icon"
                class="flex-shrink-0 h-5 w-5 transition-colors duration-200"
                :class="[
                  sidebarCollapsed ? '' : 'mr-3',
                  $route.path.startsWith(item.href)
                    ? 'text-brand-primary'
                    : 'text-slate-400 group-hover:text-slate-600',
                ]"
                aria-hidden="true"
              />
              <span v-if="!sidebarCollapsed" class="transition-opacity duration-300">
                {{ item.name }}
              </span>

              <!-- Active Indicator -->
              <div
                v-if="$route.path.startsWith(item.href) && !sidebarCollapsed"
                class="ml-auto w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(var(--color-brand-primary-rgb),0.6)]"
              />
            </router-link>
          </nav>
        </div>

        <!-- User Profile Section -->
        <div class="p-4 border-t border-slate-100 bg-slate-50/30 flex-shrink-0">
          <div
            v-if="!sidebarCollapsed"
            class="flex items-center p-3 rounded-2xl bg-white border border-slate-200/60 shadow-sm group transition-all duration-300 hover:shadow-md"
          >
            <div class="relative">
              <img
                class="h-10 w-10 rounded-xl object-cover ring-2 ring-white shadow-sm"
                :src="
                  user.avatar ||
                  'https://ui-avatars.com/api/?name=' + user.name + '&background=6366f1&color=fff'
                "
                :alt="user.name"
              />
              <div
                class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"
              />
            </div>
            <div class="ml-3 flex-1 min-w-0">
              <p class="text-sm font-semibold text-slate-900 truncate">
                {{ user.name }}
              </p>
              <p class="text-xs text-slate-500 truncate">
                {{ authStore.isAdmin ? 'Administrator' : 'Student' }}
              </p>
            </div>
            <button
              @click="logout"
              class="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
              title="Sign out"
            >
              <ArrowRightOnRectangleIcon class="w-5 h-5" />
            </button>
          </div>
          <!-- Collapsed Profile -->
          <div v-else class="flex justify-center">
            <button
              @click="logout"
              class="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
              title="Sign out"
            >
              <ArrowRightOnRectangleIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Toggle Button -->
      <button
        @click="toggleSidebar"
        class="absolute -right-3 top-20 w-6 h-6 bg-white border border-slate-200 rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-slate-50 z-50"
      >
        <svg
          class="w-3 h-3 text-slate-600 transition-transform duration-300"
          :class="sidebarCollapsed ? 'rotate-180' : ''"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    </aside>

    <!-- Main content - Dynamic margin based on sidebar state -->
    <div
      class="flex flex-col min-h-screen transition-all duration-300 ease-in-out"
      :class="sidebarCollapsed ? 'md:pl-16' : 'md:pl-72'"
    >
      <!-- Top navigation -->
      <header
        class="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center sticky top-0 z-30"
      >
        <div class="flex-1 px-8 flex justify-between items-center">
          <div class="flex items-center gap-4">
            <button
              type="button"
              class="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
              @click="mobileMenuOpen = true"
            >
              <Bars3Icon class="h-6 w-6" />
            </button>
            <h2 class="text-xl font-bold text-slate-900 tracking-tight">
              {{ $route.meta.title || 'Dashboard' }}
            </h2>
          </div>

          <div class="flex items-center gap-4">
            <!-- Search Bar (Visual only for now) -->
            <div class="hidden lg:flex items-center relative group">
              <MagnifyingGlassIcon
                class="absolute left-3 w-4 h-4 text-slate-400 group-focus-within:text-brand-primary transition-colors"
              />
              <input
                type="text"
                placeholder="Search anything..."
                class="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-brand-primary/30 focus:ring-4 focus:ring-brand-primary/5 rounded-xl text-sm w-64 transition-all duration-200"
              />
            </div>

            <div class="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block" />

            <!-- Notifications -->
            <button
              type="button"
              class="relative p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 group"
            >
              <BellIcon class="h-5 w-5" />
              <span
                class="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"
              />
            </button>

            <!-- Profile Dropdown (Simplified) -->
            <router-link
              to="/profile"
              class="p-1 rounded-xl hover:bg-slate-100 transition-colors hidden sm:block"
            >
              <img
                class="h-9 w-9 rounded-lg object-cover"
                :src="user.avatar || 'https://ui-avatars.com/api/?name=' + user.name"
                :alt="user.name"
              />
            </router-link>
          </div>
        </div>
      </header>

      <!-- Page content - scrollable area -->
      <main
        class="flex-1 overflow-y-auto focus:outline-none custom-scrollbar"
        :class="isVideoDetailsPage ? 'bg-transparent' : 'bg-[#F8FAFC]'"
      >
        <div :class="isVideoDetailsPage ? '' : 'py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-8'">
          <router-view v-slot="{ Component }">
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-4"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-4"
              mode="out-in"
            >
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>

    <!-- Mobile sidebar -->
    <TransitionRoot as="template" :show="mobileMenuOpen">
      <Dialog as="div" class="relative z-50 md:hidden" @close="mobileMenuOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="mobileMenuOpen = false"
                  >
                    <XMarkIcon class="h-6 w-6 text-white" />
                  </button>
                </div>
              </TransitionChild>

              <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div class="flex-shrink-0 flex items-center px-4 mb-8">
                  <div
                    class="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center mr-3"
                  >
                    <VideoCameraIcon class="w-5 h-5 text-white" />
                  </div>
                  <h1 class="text-xl font-bold text-slate-900">Course2CEO</h1>
                </div>
                <nav class="px-2 space-y-1">
                  <router-link
                    v-for="item in navItems"
                    :key="item.name"
                    :to="item.href"
                    class="group flex items-center px-4 py-3 text-base font-medium rounded-xl"
                    :class="[
                      $route.path.startsWith(item.href)
                        ? 'bg-brand-primary/5 text-brand-primary'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                    ]"
                    @click="mobileMenuOpen = false"
                  >
                    <component :is="item.icon" class="mr-4 h-6 w-6" />
                    {{ item.name }}
                  </router-link>
                </nav>
              </div>

              <div class="p-4 border-t border-slate-100">
                <div class="flex items-center p-3 rounded-xl bg-slate-50">
                  <img
                    class="h-10 w-10 rounded-lg"
                    :src="user.avatar || 'https://ui-avatars.com/api/?name=' + user.name"
                    :alt="user.name"
                  />
                  <div class="ml-3">
                    <p class="text-sm font-medium text-slate-900">{{ user.name }}</p>
                    <button @click="logout" class="text-xs text-rose-500 font-medium">
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  HomeIcon,
  VideoCameraIcon,
  UserGroupIcon,
  DocumentCheckIcon,
  UserCircleIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const mobileMenuOpen = ref(false)
const sidebarCollapsed = ref(false)

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// Check if we're on video details page (no padding needed)
const isVideoDetailsPage = computed(() => {
  return route.path.match(/^\/videos\/[^/]+$/)
})

const user = computed(() => ({
  name: authStore.user?.name || 'User',
  email: authStore.user?.email || 'user@example.com',
  avatar: authStore.user?.avatar,
}))

const navItems = computed(() => {
  const items = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Videos', href: '/videos', icon: VideoCameraIcon },
  ]

  if (authStore.isAdmin) {
    items.push(
      { name: 'Students', href: '/students', icon: UserGroupIcon },
      { name: 'Requests', href: '/admin/requests', icon: DocumentCheckIcon },
    )
  }

  items.push({ name: 'Profile', href: '/profile', icon: UserCircleIcon })

  return items
})

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
