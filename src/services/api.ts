// API Configuration and Service Layer

import type {
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  VideoListResponse,
  StudentVideoListResponse,
  VideoDetailsResponse,
  VideoUploadRequest,
  VideoUploadResponse,
  MessageResponse,
  StudentListResponse,
  GrantPermissionRequest,
  RevokePermissionRequest,
  PermissionGrantResponse,
  PermissionListResponse,
  AccessRequestListResponse,
  AccessRequestResponse,
  NotificationListResponse,
  UnreadNotificationsResponse,
  StreamPermissionCheckResponse,
} from '@/types/api'
import { API_BASE_URL } from '@/utils/api'


// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('token')
}

// Helper function to create headers
const createHeaders = (includeAuth = true): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (includeAuth) {
    const token = getAuthToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  return headers
}

// Generic fetch wrapper
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
  includeAuth = true,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...createHeaders(includeAuth),
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }))
    throw new Error(error.message || 'API request failed')
  }

  return response.json()
}

// Authentication API
export const authAPI = {
  register: (data: RegisterRequest): Promise<AuthResponse> =>
    fetchAPI<AuthResponse>(
      '/auth/register',
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      false,
    ),

  login: (data: LoginRequest): Promise<AuthResponse> =>
    fetchAPI<AuthResponse>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      false,
    ),

  getCurrentUser: (): Promise<{ user: User }> => fetchAPI<{ user: User }>('/auth/me'),
}

// Admin Video API
export const adminVideoAPI = {
  upload: async (data: VideoUploadRequest): Promise<VideoUploadResponse> => {
    const formData = new FormData()
    formData.append('title', data.title)
    if (data.description) formData.append('description', data.description)
    if (data.thumbnailUrl) formData.append('thumbnailUrl', data.thumbnailUrl)
    formData.append('videoFile', data.videoFile)

    const token = getAuthToken()
    const response = await fetch(`${API_BASE_URL}/admin/videos/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }))
      throw new Error(error.message || 'Video upload failed')
    }

    return response.json()
  },

  list: (): Promise<VideoListResponse> => fetchAPI<VideoListResponse>('/admin/videos/list'),

  getDetails: (videoId: string): Promise<VideoDetailsResponse> =>
    fetchAPI<VideoDetailsResponse>(`/admin/videos/details/${videoId}`),

  delete: (videoId: string): Promise<MessageResponse> =>
    fetchAPI<MessageResponse>(`/admin/videos/delete/${videoId}`, {
      method: 'DELETE',
    }),

  getStudents: (): Promise<StudentListResponse> =>
    fetchAPI<StudentListResponse>('/admin/videos/students'),
}

// Admin Permission API
export const adminPermissionAPI = {
  grant: (data: GrantPermissionRequest): Promise<PermissionGrantResponse> =>
    fetchAPI<PermissionGrantResponse>('/admin/permissions/grant', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  revoke: (data: RevokePermissionRequest): Promise<MessageResponse> =>
    fetchAPI<MessageResponse>('/admin/permissions/revoke', {
      method: 'DELETE',
      body: JSON.stringify(data),
    }),

  getRequests: (): Promise<AccessRequestListResponse> =>
    fetchAPI<AccessRequestListResponse>('/admin/permissions/requests'),

  approve: (requestId: string): Promise<AccessRequestResponse> =>
    fetchAPI<AccessRequestResponse>(`/admin/permissions/approve/${requestId}`, {
      method: 'POST',
    }),

  reject: (requestId: string): Promise<AccessRequestResponse> =>
    fetchAPI<AccessRequestResponse>(`/admin/permissions/reject/${requestId}`, {
      method: 'POST',
    }),

  getVideoPermissions: (videoId: string): Promise<PermissionListResponse> =>
    fetchAPI<PermissionListResponse>(`/admin/permissions/video/${videoId}/permissions`),
}

// Student Video API
export const studentVideoAPI = {
  list: (): Promise<StudentVideoListResponse> =>
    fetchAPI<StudentVideoListResponse>('/student/videos/list'),

  getDetails: (videoId: string): Promise<VideoDetailsResponse> =>
    fetchAPI<VideoDetailsResponse>(`/student/videos/details/${videoId}`),

  requestAccess: (videoId: string): Promise<AccessRequestResponse> =>
    fetchAPI<AccessRequestResponse>(`/student/videos/request-access/${videoId}`, {
      method: 'POST',
    }),

  getMyPermissions: (): Promise<PermissionListResponse> =>
    fetchAPI<PermissionListResponse>('/student/videos/my-permissions'),

  getMyRequests: (): Promise<AccessRequestListResponse> =>
    fetchAPI<AccessRequestListResponse>('/student/videos/my-requests'),
}

// Notification API
export const notificationAPI = {
  getAll: (): Promise<NotificationListResponse> =>
    fetchAPI<NotificationListResponse>('/notifications'),

  getUnread: (): Promise<UnreadNotificationsResponse> =>
    fetchAPI<UnreadNotificationsResponse>('/notifications/unread'),

  markAsRead: (notificationId: string): Promise<MessageResponse> =>
    fetchAPI<MessageResponse>(`/notifications/mark-read/${notificationId}`, {
      method: 'PATCH',
    }),

  markAllAsRead: (): Promise<MessageResponse> =>
    fetchAPI<MessageResponse>('/notifications/mark-all-read', {
      method: 'PATCH',
    }),

  delete: (notificationId: string): Promise<MessageResponse> =>
    fetchAPI<MessageResponse>(`/notifications/${notificationId}`, {
      method: 'DELETE',
    }),
}

// Stream API
export const streamAPI = {
  checkPermission: (videoId: string): Promise<StreamPermissionCheckResponse> =>
    fetchAPI<StreamPermissionCheckResponse>(`/stream/${videoId}/check-permission`),

  getStreamUrl: (videoId: string): string => {
    const token = getAuthToken()
    return `${API_BASE_URL}/stream/${videoId}?token=${token}`
  },
}

// Dashboard Stats (computed from various endpoints)
export const dashboardAPI = {
  getAdminStats: async () => {
    const [videos, students, requests] = await Promise.all([
      adminVideoAPI.list(),
      adminVideoAPI.getStudents(),
      adminPermissionAPI.getRequests(),
    ])

    return {
      totalVideos: videos.videos.length,
      totalStudents: students.students.length,
      pendingRequests: requests.requests.filter((r) => r.status === 'pending').length,
      activePermissions: 0, // Will need to aggregate from all videos
    }
  },

  getStudentStats: async () => {
    const [videos, permissions, requests] = await Promise.all([
      studentVideoAPI.list(),
      studentVideoAPI.getMyPermissions(),
      studentVideoAPI.getMyRequests(),
    ])

    return {
      availableVideos: videos.videos.filter((v) => v.hasPermission).length,
      pendingRequests: requests.requests.filter((r) => r.status === 'pending').length,
      grantedAccess: permissions.permissions.length,
      recentlyWatched: 0, // Would need tracking implementation
    }
  },
}
