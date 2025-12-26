// API Type Definitions for Course2CEO Backend

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'student'
  createdAt: string
  updatedAt: string
}

export interface Video {
  id: string
  title: string
  description?: string
  thumbnailUrl?: string
  backblazeFileId?: string
  backblazeFileName?: string
  createdBy: string
  createdAt: string
  updatedAt?: string
}

export interface VideoWithCreator extends Video {
  creator: {
    id: string
    name: string
    email: string
  }
}

export interface VideoWithPermission extends VideoWithCreator {
  hasPermission: boolean
  accessRequest?: {
    id: string
    status: AccessRequestStatus
    createdAt: string
  }
}

export interface Permission {
  id: string
  studentId: string
  videoId: string
  grantedBy: string
  grantedAt: string
}

export interface PermissionWithDetails extends Permission {
  student: {
    id: string
    name: string
    email: string
  }
  grantedByUser?: {
    id: string
    name: string
  }
  video?: Video
}

export type AccessRequestStatus = 'pending' | 'approved' | 'rejected'

export interface AccessRequest {
  id: string
  studentId: string
  videoId: string
  status: AccessRequestStatus
  createdAt: string
  updatedAt: string
}

export interface AccessRequestWithDetails extends AccessRequest {
  student: {
    id: string
    name: string
    email: string
  }
  video: {
    id: string
    title: string
    description?: string
    thumbnailUrl?: string
  }
}

export type NotificationReadStatus = 'read' | 'unread'

export interface Notification {
  id: string
  adminId: string
  message: string
  readStatus: NotificationReadStatus
  relatedRequestId?: string
  createdAt: string
}

export interface NotificationWithDetails extends Notification {
  relatedRequest?: {
    id: string
    studentId: string
    videoId: string
    status: AccessRequestStatus
    createdAt: string
    student: {
      id: string
      name: string
      email: string
    }
    video: {
      id: string
      title: string
    }
  }
}

// API Response Types

export interface AuthResponse {
  message: string
  token: string
  user: User
}

export interface MessageResponse {
  message: string
}

export interface VideoUploadResponse {
  message: string
  video: Video
}

export interface VideoListResponse {
  videos: VideoWithCreator[]
}

export interface StudentVideoListResponse {
  videos: VideoWithPermission[]
}

export interface VideoDetailsResponse {
  video: VideoWithCreator & {
    permissions?: PermissionWithDetails[]
  }
}

export interface StudentListResponse {
  students: User[]
}

export interface PermissionGrantResponse {
  message: string
  permission: Permission
}

export interface PermissionListResponse {
  permissions: PermissionWithDetails[]
}

export interface AccessRequestListResponse {
  requests: AccessRequestWithDetails[]
}

export interface AccessRequestResponse {
  message: string
  request: AccessRequest
}

export interface NotificationListResponse {
  notifications: NotificationWithDetails[]
}

export interface UnreadNotificationsResponse {
  notifications: NotificationWithDetails[]
  count: number
}

export interface StreamPermissionCheckResponse {
  videoId: string
  hasPermission: boolean
  locked: boolean
}

export interface HealthResponse {
  status: string
  timestamp: string
}

// Request Body Types

export interface RegisterRequest {
  name: string
  email: string
  password: string
  role?: 'admin' | 'student'
}

export interface LoginRequest {
  email: string
  password: string
}

export interface VideoUploadRequest {
  title: string
  description?: string
  thumbnailUrl?: string
  videoFile: File
}

export interface GrantPermissionRequest {
  studentId: string
  videoId: string
}

export interface RevokePermissionRequest {
  studentId: string
  videoId: string
}

// Dashboard Statistics Types

export interface AdminDashboardStats {
  totalVideos: number
  totalStudents: number
  pendingRequests: number
  activePermissions: number
}

export interface StudentDashboardStats {
  availableVideos: number
  pendingRequests: number
  grantedAccess: number
  recentlyWatched: number
}

export interface DashboardActivity {
  id: string
  type: 'video_upload' | 'access_request' | 'permission_granted' | 'permission_revoked'
  title: string
  description: string
  timestamp: string
  icon?: string | any
  status?: string
  user?: {
    name: string
    email: string
  }
}
