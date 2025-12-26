// User Types
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'student'
  avatar?: string
  createdAt: string
}

// Video Types
export interface Video {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  videoUrl: string
  duration: number // in seconds
  category?: string
  uploadedBy: string
  createdAt: string
  updatedAt: string
}

// Permission Types
export type PermissionStatus = 'unlocked' | 'locked' | 'pending'

export interface VideoPermission {
  id: string
  videoId: string
  studentId: string
  status: PermissionStatus
  requestedAt?: string
  approvedAt?: string
  rejectedAt?: string
  adminNotes?: string
}

export interface VideoWithPermission extends Video {
  permissionStatus: PermissionStatus
  permission?: VideoPermission
}

// Notification Types
export type NotificationType =
  | 'access_request'
  | 'access_granted'
  | 'access_denied'
  | 'new_video'
  | 'general'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  createdAt: string
  relatedVideoId?: string
  relatedUserId?: string
}

// Auth Types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  role: 'admin' | 'student'
}

export interface AuthResponse {
  user: User
  token: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Form Types
export interface VideoUploadData {
  title: string
  description: string
  category?: string
  file: File
}

// Dashboard Stats
export interface DashboardStats {
  totalVideos: number
  totalStudents?: number
  pendingRequests?: number
  totalViews?: number
  monthlyGrowth?: {
    videos: number
    students: number
    views: number
  }
}

// Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  icon?: any
  iconPosition?: 'left' | 'right'
}

export interface InputProps {
  modelValue: string | number
  label?: string
  placeholder?: string
  type?: string
  error?: string
  helperText?: string
  required?: boolean
  disabled?: boolean
}

export interface ModalProps {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnBackdrop?: boolean
}

export interface ToastOptions {
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

// Re-export API types
export * from './api'
