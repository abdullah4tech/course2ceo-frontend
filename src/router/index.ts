// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: () => import('@/views/LandingPage.vue'),
      meta: { requiresAuth: false, title: 'Home', layout: 'landing' },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/auth/Login.vue'),
      meta: { requiresAuth: false, layout: 'auth' },
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/auth/Register.vue'),
      meta: { requiresAuth: false, layout: 'auth' },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: { requiresAuth: true, title: 'Dashboard' },
    },
    {
      path: '/videos',
      name: 'Videos',
      component: () => import('@/views/videos/VideoList.vue'),
      meta: { requiresAuth: true, title: 'Videos' },
    },
    {
      path: '/videos/upload',
      name: 'UploadVideo',
      component: () => import('@/views/videos/UploadVideo.vue'),
      meta: { requiresAuth: true, title: 'Upload Video', adminOnly: true },
    },
    {
      path: '/videos/:id',
      name: 'VideoDetails',
      component: () => import('@/views/videos/VideoDetails.vue'),
      meta: { requiresAuth: true, title: 'Video Details' },
    },
    {
      path: '/students',
      name: 'Students',
      component: () => import('@/views/students/StudentList.vue'),
      meta: { requiresAuth: true, title: 'Students', adminOnly: true },
    },
    {
      path: '/admin/requests',
      name: 'AdminRequests',
      component: () => import('@/views/admin/AccessRequests.vue'),
      meta: { requiresAuth: true, title: 'Access Requests', adminOnly: true },
    },
    {
      path: '/admin/reports',
      name: 'AdminReports',
      component: () => import('@/views/admin/Reports.vue'),
      meta: { requiresAuth: true, title: 'Reports', adminOnly: true },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/Profile.vue'),
      meta: { requiresAuth: true, title: 'My Profile' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next('/login')
  }

  if (to.meta.adminOnly && !authStore.isAdmin) {
    return next('/dashboard')
  }

  if ((to.path === '/login' || to.path === '/register') && authStore.isAuthenticated) {
    return next(authStore.isAdmin ? '/admin' : '/dashboard')
  }

  document.title = to.meta.title ? `${to.meta.title} | Course2CEO` : 'Course2CEO'

  next()
})

export default router
