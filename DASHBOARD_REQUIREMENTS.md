# Course2CEO Dashboard - Nuxt.js Implementation Guide

## 📋 Project Overview

Create a modern, responsive dashboard for the Course2CEO video platform using **Nuxt.js 3** with TypeScript. The dashboard will support two user roles: **Admin** and **Student**, each with distinct features and permissions.

---

## 🎯 Project Requirements

### Technology Stack
- **Framework**: Nuxt.js 3 (with TypeScript)
- **Styling**: TailwindCSS + HeadlessUI or Nuxt UI
- **State Management**: Pinia
- **HTTP Client**: Nuxt's built-in $fetch or axios
- **Authentication**: JWT-based (store in httpOnly cookie or localStorage)
- **Video Player**: Video.js or Plyr
- **Icons**: Heroicons or Lucide Icons
- **Notifications**: Vue Toastification or Nuxt UI Toast

---

## 🔗 Backend API Base URL

```
http://localhost:3000
```

**Important**: All authenticated requests require an `Authorization` header:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 📡 Complete API Endpoints Reference

### 🔐 Authentication Routes (`/auth`)

#### 1. Register User
- **Endpoint**: `POST /auth/register`
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student" // Optional: "admin" or "student" (default: "student")
}
```
- **Response**:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

#### 2. Login
- **Endpoint**: `POST /auth/login`
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

#### 3. Get Current User
- **Endpoint**: `GET /auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "user": {
    "id": "d249c430-ae65-47b3-8f46-c1a1a45e8cf7",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "createdAt": "2025-12-19T10:30:00.000Z",
    "updatedAt": "2025-12-19T10:30:00.000Z"
  }
}
```

---

### 👑 Admin Routes

#### Video Management (`/admin/videos`)

##### 1. Upload Video
- **Endpoint**: `POST /admin/videos/upload`
- **Headers**: `Authorization: Bearer <token>`
- **Content-Type**: `multipart/form-data`
- **Body** (FormData):
```javascript
{
  title: "Introduction to JavaScript",
  description: "Learn JavaScript basics", // Optional
  thumbnailUrl: "https://example.com/thumb.jpg", // Optional
  videoFile: <File> // Required: video/mp4, video/mpeg, video/quicktime, video/x-msvideo
}
```
- **Response**:
```json
{
  "message": "Video uploaded successfully",
  "video": {
    "id": "341845bd-3a2b-461e-9af6-f10658631227",
    "title": "Introduction to JavaScript",
    "description": "Learn JavaScript basics",
    "thumbnailUrl": "https://example.com/thumb.jpg",
    "createdAt": "2025-12-19T10:30:00.000Z"
  }
}
```

##### 2. List All Videos
- **Endpoint**: `GET /admin/videos/list`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "videos": [
    {
      "id": "341845bd-3a2b-461e-9af6-f10658631227",
      "title": "Introduction to JavaScript",
      "description": "Learn JavaScript basics",
      "thumbnailUrl": "https://example.com/thumb.jpg",
      "createdBy": {
        "id": "admin-user-id",
        "name": "Admin User",
        "email": "admin@example.com"
      },
      "createdAt": "2025-12-19T10:30:00.000Z"
    }
  ]
}
```

##### 3. Get Video Details
- **Endpoint**: `GET /admin/videos/details/:videoId`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "video": {
    "id": "341845bd-3a2b-461e-9af6-f10658631227",
    "title": "Introduction to JavaScript",
    "description": "Learn JavaScript basics",
    "thumbnailUrl": "https://example.com/thumb.jpg",
    "backblazeFileId": "file-id",
    "backblazeFileName": "filename.mp4",
    "createdBy": "admin-user-id",
    "createdAt": "2025-12-19T10:30:00.000Z",
    "creator": {
      "id": "admin-user-id",
      "name": "Admin User",
      "email": "admin@example.com"
    },
    "permissions": [
      {
        "id": "permission-id",
        "studentId": "student-id",
        "videoId": "341845bd-3a2b-461e-9af6-f10658631227",
        "grantedBy": "admin-user-id",
        "grantedAt": "2025-12-19T10:30:00.000Z",
        "student": {
          "id": "student-id",
          "name": "John Doe",
          "email": "john@example.com"
        }
      }
    ]
  }
}
```

##### 4. Delete Video
- **Endpoint**: `DELETE /admin/videos/delete/:videoId`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "message": "Video deleted successfully"
}
```

##### 5. Get All Students
- **Endpoint**: `GET /admin/videos/students`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "students": [
    {
      "id": "d249c430-ae65-47b3-8f46-c1a1a45e8cf7",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "createdAt": "2025-12-19T10:30:00.000Z",
      "updatedAt": "2025-12-19T10:30:00.000Z"
    }
  ]
}
```

#### Permission Management (`/admin/permissions`)

##### 1. Grant Video Permission
- **Endpoint**: `POST /admin/permissions/grant`
- **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Body**:
```json
{
  "studentId": "d249c430-ae65-47b3-8f46-c1a1a45e8cf7",
  "videoId": "341845bd-3a2b-461e-9af6-f10658631227"
}
```
- **Response**:
```json
{
  "message": "Permission granted successfully",
  "permission": {
    "id": "permission-id",
    "studentId": "d249c430-ae65-47b3-8f46-c1a1a45e8cf7",
    "videoId": "341845bd-3a2b-461e-9af6-f10658631227",
    "grantedAt": "2025-12-19T10:30:00.000Z"
  }
}
```

##### 2. Revoke Video Permission
- **Endpoint**: `DELETE /admin/permissions/revoke`
- **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Body**:
```json
{
  "studentId": "d249c430-ae65-47b3-8f46-c1a1a45e8cf7",
  "videoId": "341845bd-3a2b-461e-9af6-f10658631227"
}
```
- **Response**:
```json
{
  "message": "Permission revoked successfully"
}
```

##### 3. Get All Access Requests
- **Endpoint**: `GET /admin/permissions/requests`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "requests": [
    {
      "id": "request-id",
      "studentId": "student-id",
      "videoId": "video-id",
      "status": "pending",
      "createdAt": "2025-12-19T10:30:00.000Z",
      "updatedAt": "2025-12-19T10:30:00.000Z",
      "student": {
        "id": "student-id",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "video": {
        "id": "video-id",
        "title": "Introduction to JavaScript",
        "description": "Learn JavaScript basics",
        "thumbnailUrl": "https://example.com/thumb.jpg"
      }
    }
  ]
}
```

##### 4. Approve Access Request
- **Endpoint**: `POST /admin/permissions/approve/:requestId`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "message": "Access request approved successfully",
  "request": {
    "id": "request-id",
    "status": "approved"
  }
}
```

##### 5. Reject Access Request
- **Endpoint**: `POST /admin/permissions/reject/:requestId`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "message": "Access request rejected successfully",
  "request": {
    "id": "request-id",
    "status": "rejected"
  }
}
```

##### 6. Get Video Permissions
- **Endpoint**: `GET /admin/permissions/video/:videoId/permissions`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "permissions": [
    {
      "id": "permission-id",
      "studentId": "student-id",
      "videoId": "video-id",
      "grantedBy": "admin-id",
      "grantedAt": "2025-12-19T10:30:00.000Z",
      "student": {
        "id": "student-id",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "grantedByUser": {
        "id": "admin-id",
        "name": "Admin User"
      }
    }
  ]
}
```

---

### 🎓 Student Routes

#### Video Access (`/student/videos`)

##### 1. List All Videos (with permission status)
- **Endpoint**: `GET /student/videos/list`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "videos": [
    {
      "id": "video-id",
      "title": "Introduction to JavaScript",
      "description": "Learn JavaScript basics",
      "thumbnailUrl": "https://example.com/thumb.jpg",
      "createdBy": {
        "id": "admin-id",
        "name": "Admin User"
      },
      "createdAt": "2025-12-19T10:30:00.000Z",
      "hasPermission": true
    }
  ]
}
```

##### 2. Get Video Details
- **Endpoint**: `GET /student/videos/details/:videoId`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "video": {
    "id": "video-id",
    "title": "Introduction to JavaScript",
    "description": "Learn JavaScript basics",
    "thumbnailUrl": "https://example.com/thumb.jpg",
    "createdBy": {
      "id": "admin-id",
      "name": "Admin User"
    },
    "createdAt": "2025-12-19T10:30:00.000Z",
    "hasPermission": true,
    "accessRequest": {
      "id": "request-id",
      "status": "pending",
      "createdAt": "2025-12-19T10:30:00.000Z"
    }
  }
}
```

##### 3. Request Video Access
- **Endpoint**: `POST /student/videos/request-access/:videoId`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "message": "Access request submitted successfully",
  "request": {
    "id": "request-id",
    "status": "pending",
    "createdAt": "2025-12-19T10:30:00.000Z"
  }
}
```

##### 4. Get My Permissions
- **Endpoint**: `GET /student/videos/my-permissions`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "permissions": [
    {
      "id": "permission-id",
      "video": {
        "id": "video-id",
        "title": "Introduction to JavaScript",
        "description": "Learn JavaScript basics",
        "thumbnailUrl": "https://example.com/thumb.jpg",
        "createdAt": "2025-12-19T10:30:00.000Z"
      },
      "grantedAt": "2025-12-19T10:30:00.000Z"
    }
  ]
}
```

##### 5. Get My Access Requests
- **Endpoint**: `GET /student/videos/my-requests`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "requests": [
    {
      "id": "request-id",
      "studentId": "student-id",
      "videoId": "video-id",
      "status": "pending",
      "createdAt": "2025-12-19T10:30:00.000Z",
      "updatedAt": "2025-12-19T10:30:00.000Z",
      "video": {
        "id": "video-id",
        "title": "Introduction to JavaScript",
        "description": "Learn JavaScript basics",
        "thumbnailUrl": "https://example.com/thumb.jpg"
      }
    }
  ]
}
```

---

### 🎥 Streaming Routes (`/stream`)

##### 1. Stream Video
- **Endpoint**: `GET /stream/:videoId`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Video stream (video/mp4) or error
```json
{
  "error": "Forbidden: You do not have permission to watch this video",
  "locked": true
}
```

##### 2. Check Permission
- **Endpoint**: `GET /stream/:videoId/check-permission`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "videoId": "video-id",
  "hasPermission": true,
  "locked": false
}
```

---

### 🔔 Notification Routes (`/notifications`)

##### 1. Get All Notifications
- **Endpoint**: `GET /notifications`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "notifications": [
    {
      "id": "notification-id",
      "adminId": "admin-id",
      "message": "john@example.com has requested access to video: Introduction to JavaScript",
      "readStatus": "unread",
      "relatedRequestId": "request-id",
      "createdAt": "2025-12-19T10:30:00.000Z",
      "relatedRequest": {
        "id": "request-id",
        "studentId": "student-id",
        "videoId": "video-id",
        "status": "pending",
        "createdAt": "2025-12-19T10:30:00.000Z",
        "student": {
          "id": "student-id",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "video": {
          "id": "video-id",
          "title": "Introduction to JavaScript"
        }
      }
    }
  ]
}
```

##### 2. Get Unread Notifications
- **Endpoint**: `GET /notifications/unread`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "notifications": [...],
  "count": 5
}
```

##### 3. Mark Notification as Read
- **Endpoint**: `PATCH /notifications/mark-read/:notificationId`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "message": "Notification marked as read"
}
```

##### 4. Mark All as Read
- **Endpoint**: `PATCH /notifications/mark-all-read`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "message": "All notifications marked as read"
}
```

##### 5. Delete Notification
- **Endpoint**: `DELETE /notifications/:notificationId`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "message": "Notification deleted successfully"
}
```

---

### 🏥 Health & Info Routes

##### 1. Root Endpoint
- **Endpoint**: `GET /`
- **Response**:
```json
{
  "message": "Course2CEO Video Platform API",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/auth",
    "admin": {
      "videos": "/admin/videos",
      "permissions": "/admin/permissions"
    },
    "student": {
      "videos": "/student/videos"
    },
    "streaming": "/stream",
    "notifications": "/notifications"
  }
}
```

##### 2. Health Check
- **Endpoint**: `GET /health`
- **Response**:
```json
{
  "status": "ok",
  "timestamp": "2025-12-19T10:30:00.000Z"
}
```

---

## 🎨 Dashboard Features & Pages

### Common Features (All Users)

#### 1. Authentication Pages
- **Login Page** (`/login`)
  - Email/password form
  - Form validation
  - Error handling
  - Redirect to dashboard on success
  - Link to register page

- **Register Page** (`/register`)
  - Name, email, password fields
  - Role selection (admin/student)
  - Form validation
  - Error handling
  - Redirect to login on success

- **Profile Page** (`/profile`)
  - Display user info
  - Edit profile functionality
  - Change password
  - Logout button

### Admin Dashboard

#### 2. Admin Layout (`/admin`)
- Sidebar navigation with:
  - Dashboard overview
  - Videos
  - Students
  - Access Requests
  - Permissions
  - Notifications (with badge count)
- Notification bell icon with dropdown
- User profile dropdown

#### 3. Admin Dashboard Overview (`/admin`)
- Statistics cards:
  - Total videos
  - Total students
  - Pending access requests
  - Active permissions
- Recent activity feed
- Quick actions (upload video, view requests)

#### 4. Videos Management (`/admin/videos`)
- List all videos in a grid/table
- Upload new video form with:
  - Title (required)
  - Description (optional)
  - Thumbnail URL (optional)
  - Video file upload (drag & drop support)
  - Progress bar during upload
- Video actions:
  - View details
  - Manage permissions
  - Delete video (with confirmation)
- Search and filter videos

#### 5. Video Details (`/admin/videos/:id`)
- Video metadata display
- Video preview/player
- List of students with access
- Quick actions:
  - Grant permission to student
  - Revoke permissions
  - Delete video
- Access requests for this video

#### 6. Students Management (`/admin/students`)
- List all students in a table
- Student info: name, email, join date
- Actions per student:
  - View videos they have access to
  - Grant permissions
  - View access requests
- Search students

#### 7. Access Requests (`/admin/requests`)
- List all pending access requests
- Request details:
  - Student name & email
  - Video title
  - Request date
  - Status badge
- Actions:
  - Approve (grants permission + updates request)
  - Reject (updates request status)
- Filter by status (pending/approved/rejected)
- Real-time updates

#### 8. Permissions Management (`/admin/permissions`)
- View all granted permissions
- Filter by:
  - Student
  - Video
  - Date range
- Actions:
  - Revoke permission
  - View details
- Bulk actions (grant to multiple students)

#### 9. Notifications (`/admin/notifications`)
- List all notifications
- Unread count badge
- Mark as read functionality
- Quick actions from notifications
- Delete notifications
- Auto-refresh for new notifications

### Student Dashboard

#### 10. Student Layout (`/student`)
- Sidebar navigation with:
  - Browse Videos
  - My Videos (with permission)
  - My Requests
  - Profile
- Notification bell (for approved/rejected requests)

#### 11. Student Dashboard Overview (`/student`)
- Welcome message
- Statistics:
  - Videos available
  - Access requests pending
  - Recently granted access
- Featured/new videos

#### 12. Browse Videos (`/student/videos`)
- Grid view of all videos
- Video card shows:
  - Thumbnail
  - Title
  - Description preview
  - Creator name
  - Lock icon if no permission
- Actions per video:
  - Watch (if has permission)
  - Request Access (if no permission)
  - View Details
- Search and filter videos
- Status badges (Accessible, Pending, Locked)

#### 13. Video Details (`/student/videos/:id`)
- Video metadata
- Video player (if has permission)
- Lock screen with "Request Access" button (if no permission)
- Show access request status if pending
- Creator information

#### 14. My Videos (`/student/my-videos`)
- Grid of videos student has access to
- Quick play functionality
- Recently watched section
- Sorting options

#### 15. My Requests (`/student/requests`)
- List of all access requests
- Status indicators:
  - Pending (yellow)
  - Approved (green)
  - Rejected (red)
- Request details:
  - Video title
  - Request date
  - Status
- Actions:
  - View video (if approved)
  - Cancel request (if pending)

---

## 🎨 UI/UX Guidelines

### Design System
1. **Colors**:
   - Primary: Blue (#3B82F6)
   - Success: Green (#10B981)
   - Warning: Yellow (#F59E0B)
   - Danger: Red (#EF4444)
   - Dark: Gray (#1F2937)

2. **Typography**:
   - Headings: Inter or Poppins
   - Body: System fonts

3. **Components**:
   - Use consistent button styles
   - Loading states for all async operations
   - Empty states for no data
   - Error boundaries
   - Toast notifications for success/error messages

### Responsiveness
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Collapsible sidebar on mobile
- Touch-friendly buttons and actions

### Accessibility
- ARIA labels
- Keyboard navigation
- Focus indicators
- Color contrast compliance (WCAG AA)

---

## 🔧 Implementation Steps

### Phase 1: Setup & Authentication
1. Initialize Nuxt 3 project with TypeScript
2. Install dependencies (TailwindCSS, Pinia, etc.)
3. Configure API base URL and axios/fetch
4. Create auth store (Pinia)
5. Implement login/register pages
6. Set up auth middleware
7. Create protected route layouts

### Phase 2: Admin Features
1. Create admin layout with sidebar
2. Implement dashboard overview
3. Build video upload functionality
4. Create video list/grid view
5. Implement video details page
6. Build students management
7. Create access requests page
8. Implement permissions management
9. Add notifications system

### Phase 3: Student Features
1. Create student layout
2. Implement browse videos page
3. Build video details with player
4. Create request access functionality
5. Implement my videos page
6. Build my requests page
7. Add notifications for students

### Phase 4: Polish & Optimization
1. Add loading states everywhere
2. Implement error handling
3. Add toast notifications
4. Optimize video player
5. Add search & filtering
6. Implement pagination
7. Add dark mode (optional)
8. Performance optimization
9. Testing
10. Documentation

---

## 📦 Recommended NPM Packages

```json
{
  "dependencies": {
    "nuxt": "^3.13.0",
    "@pinia/nuxt": "^0.5.0",
    "@nuxtjs/tailwindcss": "^6.10.0",
    "@headlessui/vue": "^1.7.0",
    "@heroicons/vue": "^2.1.0",
    "video.js": "^8.10.0",
    "vue-toastification": "^2.0.0-rc.5",
    "zod": "^3.22.0",
    "date-fns": "^3.0.0"
  },
  "devDependencies": {
    "@nuxtjs/eslint-config-typescript": "^12.1.0",
    "typescript": "^5.3.0",
    "prettier": "^3.1.0"
  }
}
```

---

## 🗂️ Suggested Folder Structure

```
course2ceo-dashboard/
├── assets/
│   └── css/
│       └── main.css
├── components/
│   ├── admin/
│   │   ├── VideoCard.vue
│   │   ├── VideoUploadForm.vue
│   │   ├── AccessRequestItem.vue
│   │   ├── PermissionTable.vue
│   │   └── StudentList.vue
│   ├── student/
│   │   ├── VideoCard.vue
│   │   ├── VideoPlayer.vue
│   │   └── RequestStatusBadge.vue
│   ├── common/
│   │   ├── Navbar.vue
│   │   ├── Sidebar.vue
│   │   ├── NotificationDropdown.vue
│   │   ├── LoadingSpinner.vue
│   │   ├── EmptyState.vue
│   │   └── ConfirmDialog.vue
│   └── ui/
│       ├── Button.vue
│       ├── Input.vue
│       ├── Card.vue
│       └── Badge.vue
├── composables/
│   ├── useAuth.ts
│   ├── useApi.ts
│   ├── useNotifications.ts
│   └── useToast.ts
├── layouts/
│   ├── default.vue
│   ├── admin.vue
│   └── student.vue
├── middleware/
│   ├── auth.ts
│   ├── admin.ts
│   └── student.ts
├── pages/
│   ├── index.vue
│   ├── login.vue
│   ├── register.vue
│   ├── profile.vue
│   ├── admin/
│   │   ├── index.vue
│   │   ├── videos/
│   │   │   ├── index.vue
│   │   │   └── [id].vue
│   │   ├── students/
│   │   │   └── index.vue
│   │   ├── requests/
│   │   │   └── index.vue
│   │   ├── permissions/
│   │   │   └── index.vue
│   │   └── notifications/
│   │       └── index.vue
│   └── student/
│       ├── index.vue
│       ├── videos/
│       │   ├── index.vue
│       │   └── [id].vue
│       ├── my-videos/
│       │   └── index.vue
│       └── requests/
│           └── index.vue
├── stores/
│   ├── auth.ts
│   ├── videos.ts
│   ├── permissions.ts
│   └── notifications.ts
├── types/
│   ├── auth.ts
│   ├── video.ts
│   ├── permission.ts
│   └── notification.ts
├── utils/
│   ├── api.ts
│   ├── constants.ts
│   └── validators.ts
├── app.vue
├── nuxt.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🔑 Key Implementation Notes

### 1. API Configuration
```typescript
// utils/api.ts
export const API_BASE_URL = 'http://localhost:3000'

export const apiClient = $fetch.create({
  baseURL: API_BASE_URL,
  onRequest({ options }) {
    const token = localStorage.getItem('token')
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`
      }
    }
  },
  onResponseError({ response }) {
    // Handle errors globally
    if (response.status === 401) {
      // Redirect to login
      navigateTo('/login')
    }
  }
})
```

### 2. Auth Store
```typescript
// stores/auth.ts
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),
  actions: {
    async login(email: string, password: string) {
      const { token, user } = await apiClient('/auth/login', {
        method: 'POST',
        body: { email, password }
      })
      this.token = token
      this.user = user
      this.isAuthenticated = true
      localStorage.setItem('token', token)
    },
    async logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      navigateTo('/login')
    }
  }
})
```

### 3. Auth Middleware
```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()
  
  if (!auth.isAuthenticated) {
    return navigateTo('/login')
  }
})
```

### 4. Video Player Component
```vue
<!-- components/student/VideoPlayer.vue -->
<template>
  <div>
    <video
      ref="videoPlayer"
      class="video-js vjs-default-skin"
      controls
      preload="auto"
    />
  </div>
</template>

<script setup lang="ts">
import videojs from 'video.js'

const props = defineProps<{
  videoId: string
}>()

const videoPlayer = ref<HTMLVideoElement>()
const player = ref<any>()

onMounted(() => {
  const token = localStorage.getItem('token')
  player.value = videojs(videoPlayer.value, {
    sources: [{
      src: `http://localhost:3000/stream/${props.videoId}?token=${token}`,
      type: 'video/mp4'
    }],
    controls: true,
    fluid: true
  })
})

onBeforeUnmount(() => {
  if (player.value) {
    player.value.dispose()
  }
})
</script>
```

### 5. File Upload with Progress
```typescript
// composables/useFileUpload.ts
export const useFileUpload = () => {
  const progress = ref(0)
  const uploading = ref(false)

  const uploadVideo = async (formData: FormData) => {
    uploading.value = true
    progress.value = 0

    try {
      const response = await $fetch('/admin/videos/upload', {
        baseURL: API_BASE_URL,
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        onUploadProgress: (event) => {
          progress.value = Math.round((event.loaded / event.total) * 100)
        }
      })
      return response
    } finally {
      uploading.value = false
      progress.value = 0
    }
  }

  return {
    progress,
    uploading,
    uploadVideo
  }
}
```

---

## ✅ Testing Checklist

### Authentication
- [ ] User can register with valid credentials
- [ ] User can login with correct credentials
- [ ] Invalid credentials show error message
- [ ] Token is stored and persists on refresh
- [ ] Protected routes redirect to login when not authenticated
- [ ] User can logout successfully

### Admin Features
- [ ] Admin can upload videos with all fields
- [ ] Admin can view all videos
- [ ] Admin can delete videos
- [ ] Admin can view all students
- [ ] Admin can grant permissions to students
- [ ] Admin can revoke permissions
- [ ] Admin can view all access requests
- [ ] Admin can approve access requests
- [ ] Admin can reject access requests
- [ ] Admin receives notifications for new requests
- [ ] Notifications can be marked as read
- [ ] Admin can view permissions per video

### Student Features
- [ ] Student can browse all videos
- [ ] Student can see which videos they have access to
- [ ] Student can request access to locked videos
- [ ] Student cannot request access twice for same video
- [ ] Student can watch videos they have permission for
- [ ] Student cannot watch videos without permission
- [ ] Student can view their access requests
- [ ] Student can see request status (pending/approved/rejected)
- [ ] Student receives notifications when requests are processed

### Video Streaming
- [ ] Video streams correctly for authorized users
- [ ] Video is blocked for unauthorized users
- [ ] Video player shows loading state
- [ ] Video player has controls (play, pause, volume, fullscreen)
- [ ] Video player works on mobile devices

### UI/UX
- [ ] All pages are responsive on mobile, tablet, desktop
- [ ] Loading spinners show during async operations
- [ ] Error messages are user-friendly
- [ ] Success messages appear for actions
- [ ] Empty states show when no data
- [ ] Confirmation dialogs for destructive actions
- [ ] Forms have validation with error messages
- [ ] Sidebar collapses on mobile
- [ ] Notification badge shows unread count

---

## 🚀 Deployment Considerations

1. **Environment Variables**:
```env
NUXT_PUBLIC_API_BASE_URL=https://api.course2ceo.com
```

2. **Build Command**:
```bash
npm run build
```

3. **Production Checklist**:
- [ ] Update API_BASE_URL to production
- [ ] Enable HTTPS
- [ ] Add error tracking (Sentry)
- [ ] Optimize images
- [ ] Add analytics
- [ ] Set up CDN for video streaming
- [ ] Configure caching
- [ ] Add rate limiting

---

## 📞 Support & Resources

- **Nuxt 3 Docs**: https://nuxt.com/docs
- **TailwindCSS**: https://tailwindcss.com/docs
- **Pinia**: https://pinia.vuejs.org/
- **Video.js**: https://videojs.com/guides/
- **HeadlessUI**: https://headlessui.com/

---

## 🎯 Success Criteria

The dashboard is complete when:
1. ✅ All API endpoints are properly integrated
2. ✅ Admin can manage videos, students, and permissions
3. ✅ Students can browse, request, and watch videos
4. ✅ Real-time notifications work for both roles
5. ✅ Video streaming is secure and performant
6. ✅ UI is responsive and accessible
7. ✅ Error handling is robust
8. ✅ Authentication flow is seamless
9. ✅ All features match the backend capabilities
10. ✅ Code is clean, typed, and documented

---

**Good luck building the Course2CEO Dashboard! 🎓🚀**
