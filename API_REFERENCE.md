# Course2CEO API Reference

## 📋 Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Admin Endpoints](#admin-endpoints)
- [Student Endpoints](#student-endpoints)
- [Streaming Endpoints](#streaming-endpoints)
- [Notification Endpoints](#notification-endpoints)
- [System Endpoints](#system-endpoints)
- [Error Handling](#error-handling)
- [Data Models](#data-models)

---

## Overview

**Base URL:** `http://localhost:3000`

**Authentication:** JWT Bearer Token

All authenticated endpoints require the following header:

```http
Authorization: Bearer <your_jwt_token>
```

**Content Types:**
- Most endpoints: `application/json`
- File upload: `multipart/form-data`

---

## Authentication

### POST /auth/register

Register a new user account.

**Request:**

```http
POST /auth/register
Content-Type: application/json
```

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "student"
}
```

**Request Fields:**

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| name | string | Yes | User's full name | Min 2 characters |
| email | string | Yes | User's email address | Valid email format |
| password | string | Yes | User's password | Min 6 characters |
| role | string | No | User role: "admin" or "student" | Default: "student" |

**Success Response (200):**

```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkMjQ5YzQzMC1hZTY1LTQ3YjMtOGY0Ni1jMWExYTQ1ZThjZjciLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJyb2xlIjoic3R1ZGVudCJ9.xxx",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

**Error Response (400):**

```json
{
  "error": "User with this email already exists"
}
```

---

### POST /auth/login

Authenticate and receive a JWT token.

**Request:**

```http
POST /auth/login
Content-Type: application/json
```

```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Request Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | User's email address |
| password | string | Yes | User's password |

**Success Response (200):**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkMjQ5YzQzMC1hZTY1LTQ3YjMtOGY0Ni1jMWExYTQ1ZThjZjciLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJyb2xlIjoic3R1ZGVudCJ9.xxx",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

**Error Response (401):**

```json
{
  "error": "Invalid email or password"
}
```

---

### GET /auth/me

Get current authenticated user's information.

**Request:**

```http
GET /auth/me
Authorization: Bearer <token>
```

**Success Response (200):**

```json
{
  "user": {
    "id": "d249c430-ae65-47b3-8f46-c1a1a45e8cf7",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "createdAt": "2025-12-20T10:30:00.000Z",
    "updatedAt": "2025-12-20T10:30:00.000Z"
  }
}
```

**Error Response (401):**

```json
{
  "error": "Unauthorized: No token provided"
}
```

```json
{
  "error": "Unauthorized: Invalid token"
}
```

**Error Response (404):**

```json
{
  "error": "User not found"
}
```

---

## Admin Endpoints

> ⚠️ **Note:** All admin endpoints require `role: "admin"` in the JWT token.

### POST /admin/videos/upload

Upload a new video to the platform.

**Request:**

```http
POST /admin/videos/upload
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

**Form Data:**

| Field | Type | Required | Description | Accepted Types |
|-------|------|----------|-------------|----------------|
| title | string | Yes | Video title | - |
| description | string | No | Video description | - |
| thumbnailUrl | string | No | URL to thumbnail image | - |
| videoFile | File | Yes | Video file | video/mp4, video/mpeg, video/quicktime, video/x-msvideo |

**Example using FormData (JavaScript):**

```javascript
const formData = new FormData();
formData.append('title', 'Introduction to JavaScript');
formData.append('description', 'Learn JavaScript basics');
formData.append('thumbnailUrl', 'https://example.com/thumb.jpg');
formData.append('videoFile', videoFileBlob, 'intro.mp4');

const response = await fetch('http://localhost:3000/admin/videos/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

**Success Response (200):**

```json
{
  "message": "Video uploaded successfully",
  "video": {
    "id": "341845bd-3a2b-461e-9af6-f10658631227",
    "title": "Introduction to JavaScript",
    "description": "Learn JavaScript basics",
    "thumbnailUrl": "https://example.com/thumb.jpg",
    "createdAt": "2025-12-20T10:30:00.000Z"
  }
}
```

**Error Response (403):**

```json
{
  "error": "Forbidden: Admin access required. Current role: student"
}
```

**Error Response (500):**

```json
{
  "error": "Failed to upload video"
}
```

---

### GET /admin/videos/list

Get a list of all videos in the system.

**Request:**

```http
GET /admin/videos/list
Authorization: Bearer <admin_token>
```

**Success Response (200):**

```json
{
  "videos": [
    {
      "id": "341845bd-3a2b-461e-9af6-f10658631227",
      "title": "Introduction to JavaScript",
      "description": "Learn JavaScript basics",
      "thumbnailUrl": "https://example.com/thumb.jpg",
      "createdBy": {
        "id": "admin-123",
        "name": "Admin User",
        "email": "admin@course2ceo.com"
      },
      "createdAt": "2025-12-20T10:30:00.000Z"
    },
    {
      "id": "7b2f1d8e-4c3a-4e9f-b1d2-5f8a3c7e9b1d",
      "title": "Advanced React Patterns",
      "description": "Master advanced React techniques",
      "thumbnailUrl": "https://example.com/react-thumb.jpg",
      "createdBy": {
        "id": "admin-123",
        "name": "Admin User",
        "email": "admin@course2ceo.com"
      },
      "createdAt": "2025-12-19T15:20:00.000Z"
    }
  ]
}
```

**Error Response (403):**

```json
{
  "error": "Forbidden: Admin access required"
}
```

---

### GET /admin/videos/details/:videoId

Get detailed information about a specific video, including permissions.

**Request:**

```http
GET /admin/videos/details/341845bd-3a2b-461e-9af6-f10658631227
Authorization: Bearer <admin_token>
```

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| videoId | UUID | The video's unique identifier |

**Success Response (200):**

```json
{
  "video": {
    "id": "341845bd-3a2b-461e-9af6-f10658631227",
    "title": "Introduction to JavaScript",
    "description": "Learn JavaScript basics",
    "thumbnailUrl": "https://example.com/thumb.jpg",
    "backblazeFileId": "4_z27c88f1d182b58b93780319_f1000b3b2d07f7e22_d20251220_m103000_c002_v0001_t0000",
    "backblazeFileName": "videos/intro-javascript.mp4",
    "createdBy": "admin-123",
    "createdAt": "2025-12-20T10:30:00.000Z",
    "updatedAt": "2025-12-20T10:30:00.000Z",
    "creator": {
      "id": "admin-123",
      "name": "Admin User",
      "email": "admin@course2ceo.com"
    },
    "permissions": [
      {
        "id": "perm-001",
        "studentId": "student-456",
        "videoId": "341845bd-3a2b-461e-9af6-f10658631227",
        "grantedBy": "admin-123",
        "grantedAt": "2025-12-20T11:00:00.000Z",
        "student": {
          "id": "student-456",
          "name": "Jane Smith",
          "email": "jane@example.com"
        }
      }
    ]
  }
}
```

**Error Response (404):**

```json
{
  "error": "Video not found"
}
```

---

### DELETE /admin/videos/delete/:videoId

Delete a video from the platform (also removes from Backblaze B2).

**Request:**

```http
DELETE /admin/videos/delete/341845bd-3a2b-461e-9af6-f10658631227
Authorization: Bearer <admin_token>
```

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| videoId | UUID | The video's unique identifier |

**Success Response (200):**

```json
{
  "message": "Video deleted successfully"
}
```

**Error Response (404):**

```json
{
  "error": "Video not found"
}
```

**Error Response (500):**

```json
{
  "error": "Failed to delete video"
}
```

---

### GET /admin/videos/students

Get a list of all students in the system.

**Request:**

```http
GET /admin/videos/students
Authorization: Bearer <admin_token>
```

**Success Response (200):**

```json
{
  "students": [
    {
      "id": "student-456",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "student",
      "createdAt": "2025-12-15T09:20:00.000Z",
      "updatedAt": "2025-12-15T09:20:00.000Z"
    },
    {
      "id": "student-789",
      "name": "Bob Johnson",
      "email": "bob@example.com",
      "role": "student",
      "createdAt": "2025-12-18T14:30:00.000Z",
      "updatedAt": "2025-12-18T14:30:00.000Z"
    }
  ]
}
```

**Error Response (500):**

```json
{
  "error": "Failed to fetch students"
}
```

---

### POST /admin/permissions/grant

Grant a student permission to access a specific video.

**Request:**

```http
POST /admin/permissions/grant
Authorization: Bearer <admin_token>
Content-Type: application/json
```

```json
{
  "studentId": "student-456",
  "videoId": "341845bd-3a2b-461e-9af6-f10658631227"
}
```

**Request Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| studentId | UUID | Yes | Student's user ID |
| videoId | UUID | Yes | Video ID to grant access to |

**Success Response (200):**

```json
{
  "message": "Permission granted successfully",
  "permission": {
    "id": "perm-001",
    "studentId": "student-456",
    "videoId": "341845bd-3a2b-461e-9af6-f10658631227",
    "grantedAt": "2025-12-20T11:00:00.000Z"
  }
}
```

**Error Response (400):**

```json
{
  "error": "Permission already exists"
}
```

```json
{
  "error": "Missing required fields: studentId and videoId"
}
```

**Error Response (500):**

```json
{
  "error": "Failed to grant permission",
  "details": "Error message"
}
```

---

### DELETE /admin/permissions/revoke

Revoke a student's permission to access a video.

**Request:**

```http
DELETE /admin/permissions/revoke
Authorization: Bearer <admin_token>
Content-Type: application/json
```

```json
{
  "studentId": "student-456",
  "videoId": "341845bd-3a2b-461e-9af6-f10658631227"
}
```

**Request Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| studentId | UUID | Yes | Student's user ID |
| videoId | UUID | Yes | Video ID to revoke access from |

**Success Response (200):**

```json
{
  "message": "Permission revoked successfully"
}
```

**Error Response (404):**

```json
{
  "error": "Permission not found"
}
```

**Error Response (500):**

```json
{
  "error": "Failed to revoke permission"
}
```

---

### GET /admin/permissions/requests

Get all pending access requests from students.

**Request:**

```http
GET /admin/permissions/requests
Authorization: Bearer <admin_token>
```

**Success Response (200):**

```json
{
  "requests": [
    {
      "id": "req-001",
      "studentId": "student-789",
      "videoId": "341845bd-3a2b-461e-9af6-f10658631227",
      "status": "pending",
      "createdAt": "2025-12-20T09:45:00.000Z",
      "updatedAt": "2025-12-20T09:45:00.000Z",
      "student": {
        "id": "student-789",
        "name": "Bob Johnson",
        "email": "bob@example.com"
      },
      "video": {
        "id": "341845bd-3a2b-461e-9af6-f10658631227",
        "title": "Introduction to JavaScript",
        "description": "Learn JavaScript basics",
        "thumbnailUrl": "https://example.com/thumb.jpg"
      }
    }
  ]
}
```

**Error Response (500):**

```json
{
  "error": "Failed to fetch access requests"
}
```

---

### POST /admin/permissions/approve/:requestId

Approve a student's access request (grants permission automatically).

**Request:**

```http
POST /admin/permissions/approve/req-001
Authorization: Bearer <admin_token>
```

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| requestId | UUID | The access request ID |

**Success Response (200):**

```json
{
  "message": "Access request approved successfully",
  "request": {
    "id": "req-001",
    "status": "approved"
  }
}
```

**Error Response (404):**

```json
{
  "error": "Access request not found"
}
```

**Error Response (400):**

```json
{
  "error": "Request has already been processed",
  "currentStatus": "approved"
}
```

**Error Response (500):**

```json
{
  "error": "Failed to approve access request",
  "details": "Error message"
}
```

---

### POST /admin/permissions/reject/:requestId

Reject a student's access request.

**Request:**

```http
POST /admin/permissions/reject/req-001
Authorization: Bearer <admin_token>
```

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| requestId | UUID | The access request ID |

**Success Response (200):**

```json
{
  "message": "Access request rejected successfully",
  "request": {
    "id": "req-001",
    "status": "rejected"
  }
}
```

**Error Response (404):**

```json
{
  "error": "Access request not found"
}
```

**Error Response (400):**

```json
{
  "error": "Request has already been processed",
  "currentStatus": "rejected"
}
```

**Error Response (500):**

```json
{
  "error": "Failed to reject access request",
  "details": "Error message"
}
```

---

### GET /admin/permissions/video/:videoId/permissions

Get all permissions granted for a specific video.

**Request:**

```http
GET /admin/permissions/video/341845bd-3a2b-461e-9af6-f10658631227/permissions
Authorization: Bearer <admin_token>
```

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| videoId | UUID | The video's unique identifier |

**Success Response (200):**

```json
{
  "permissions": [
    {
      "id": "perm-001",
      "studentId": "student-456",
      "videoId": "341845bd-3a2b-461e-9af6-f10658631227",
      "grantedBy": "admin-123",
      "grantedAt": "2025-12-20T11:00:00.000Z",
      "student": {
        "id": "student-456",
        "name": "Jane Smith",
        "email": "jane@example.com"
      },
      "grantedByUser": {
        "id": "admin-123",
        "name": "Admin User"
      }
    }
  ]
}
```

**Error Response (500):**

```json
{
  "error": "Failed to fetch video permissions"
}
```

---

## Student Endpoints

> ⚠️ **Note:** All student endpoints require authentication but work with both student and admin roles.

### GET /student/videos/list

Get all videos with permission status for the current student.

**Request:**

```http
GET /student/videos/list
Authorization: Bearer <student_token>
```

**Success Response (200):**

```json
{
  "videos": [
    {
      "id": "341845bd-3a2b-461e-9af6-f10658631227",
      "title": "Introduction to JavaScript",
      "description": "Learn JavaScript basics",
      "thumbnailUrl": "https://example.com/thumb.jpg",
      "createdBy": {
        "id": "admin-123",
        "name": "Admin User"
      },
      "createdAt": "2025-12-20T10:30:00.000Z",
      "hasPermission": true
    },
    {
      "id": "7b2f1d8e-4c3a-4e9f-b1d2-5f8a3c7e9b1d",
      "title": "Advanced React Patterns",
      "description": "Master advanced React techniques",
      "thumbnailUrl": "https://example.com/react-thumb.jpg",
      "createdBy": {
        "id": "admin-123",
        "name": "Admin User"
      },
      "createdAt": "2025-12-19T15:20:00.000Z",
      "hasPermission": false
    }
  ]
}
```

**Error Response (500):**

```json
{
  "error": "Failed to fetch videos"
}
```

---

### GET /student/videos/details/:videoId

Get detailed information about a specific video including permission and request status.

**Request:**

```http
GET /student/videos/details/341845bd-3a2b-461e-9af6-f10658631227
Authorization: Bearer <student_token>
```

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| videoId | UUID | The video's unique identifier |

**Success Response (200):**

```json
{
  "video": {
    "id": "341845bd-3a2b-461e-9af6-f10658631227",
    "title": "Introduction to JavaScript",
    "description": "Learn JavaScript basics",
    "thumbnailUrl": "https://example.com/thumb.jpg",
    "createdBy": {
      "id": "admin-123",
      "name": "Admin User"
    },
    "createdAt": "2025-12-20T10:30:00.000Z",
    "hasPermission": true,
    "accessRequest": null
  }
}
```

**Response with pending request:**

```json
{
  "video": {
    "id": "7b2f1d8e-4c3a-4e9f-b1d2-5f8a3c7e9b1d",
    "title": "Advanced React Patterns",
    "description": "Master advanced React techniques",
    "thumbnailUrl": "https://example.com/react-thumb.jpg",
    "createdBy": {
      "id": "admin-123",
      "name": "Admin User"
    },
    "createdAt": "2025-12-19T15:20:00.000Z",
    "hasPermission": false,
    "accessRequest": {
      "id": "req-002",
      "status": "pending",
      "createdAt": "2025-12-20T12:15:00.000Z"
    }
  }
}
```

**Error Response (404):**

```json
{
  "error": "Video not found"
}
```

**Error Response (500):**

```json
{
  "error": "Failed to fetch video details"
}
```

---

### POST /student/videos/request-access/:videoId

Request access to a video that the student doesn't have permission to view.

**Request:**

```http
POST /student/videos/request-access/7b2f1d8e-4c3a-4e9f-b1d2-5f8a3c7e9b1d
Authorization: Bearer <student_token>
```

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| videoId | UUID | The video's unique identifier |

**Success Response (200):**

```json
{
  "message": "Access request submitted successfully",
  "request": {
    "id": "req-002",
    "status": "pending",
    "createdAt": "2025-12-20T12:15:00.000Z"
  }
}
```

**Error Response (404):**

```json
{
  "error": "Video not found"
}
```

**Error Response (400):**

```json
{
  "error": "You already have access to this video"
}
```

```json
{
  "error": "You have already requested access to this video"
}
```

**Error Response (500):**

```json
{
  "error": "Failed to submit access request"
}
```

---

### GET /student/videos/my-permissions

Get all videos the student has permission to access.

**Request:**

```http
GET /student/videos/my-permissions
Authorization: Bearer <student_token>
```

**Success Response (200):**

```json
{
  "permissions": [
    {
      "id": "perm-001",
      "video": {
        "id": "341845bd-3a2b-461e-9af6-f10658631227",
        "title": "Introduction to JavaScript",
        "description": "Learn JavaScript basics",
        "thumbnailUrl": "https://example.com/thumb.jpg",
        "createdAt": "2025-12-20T10:30:00.000Z"
      },
      "grantedAt": "2025-12-20T11:00:00.000Z"
    }
  ]
}
```

**Error Response (500):**

```json
{
  "error": "Failed to fetch permissions"
}
```

---

### GET /student/videos/my-requests

Get all access requests made by the student.

**Request:**

```http
GET /student/videos/my-requests
Authorization: Bearer <student_token>
```

**Success Response (200):**

```json
{
  "requests": [
    {
      "id": "req-002",
      "studentId": "student-789",
      "videoId": "7b2f1d8e-4c3a-4e9f-b1d2-5f8a3c7e9b1d",
      "status": "pending",
      "createdAt": "2025-12-20T12:15:00.000Z",
      "updatedAt": "2025-12-20T12:15:00.000Z",
      "video": {
        "id": "7b2f1d8e-4c3a-4e9f-b1d2-5f8a3c7e9b1d",
        "title": "Advanced React Patterns",
        "description": "Master advanced React techniques",
        "thumbnailUrl": "https://example.com/react-thumb.jpg"
      }
    },
    {
      "id": "req-001",
      "studentId": "student-789",
      "videoId": "341845bd-3a2b-461e-9af6-f10658631227",
      "status": "approved",
      "createdAt": "2025-12-20T09:45:00.000Z",
      "updatedAt": "2025-12-20T11:00:00.000Z",
      "video": {
        "id": "341845bd-3a2b-461e-9af6-f10658631227",
        "title": "Introduction to JavaScript",
        "description": "Learn JavaScript basics",
        "thumbnailUrl": "https://example.com/thumb.jpg"
      }
    }
  ]
}
```

**Error Response (500):**

```json
{
  "error": "Failed to fetch requests"
}
```

---

## Streaming Endpoints

### GET /stream/:videoId

Stream a video file. Returns video binary data if user has permission.

**Request:**

```http
GET /stream/341845bd-3a2b-461e-9af6-f10658631227
Authorization: Bearer <token>
```

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| videoId | UUID | The video's unique identifier |

**Success Response (200):**

Returns video stream with headers:

```http
Content-Type: video/mp4
Accept-Ranges: bytes
Cache-Control: no-cache, no-store, must-revalidate
```

**Video stream binary data**

**Error Response (404):**

```json
{
  "error": "Video not found"
}
```

**Error Response (403):**

```json
{
  "error": "Forbidden: You do not have permission to watch this video",
  "locked": true
}
```

**Error Response (500):**

```json
{
  "error": "Failed to stream video"
}
```

**Usage Example (HTML5 Video Player):**

```html
<video id="videoPlayer" controls>
  <source 
    src="http://localhost:3000/stream/341845bd-3a2b-461e-9af6-f10658631227" 
    type="video/mp4"
  />
</video>

<script>
  // Set authorization header using fetch/XMLHttpRequest
  const videoElement = document.getElementById('videoPlayer');
  const token = localStorage.getItem('token');
  
  fetch(`http://localhost:3000/stream/341845bd-3a2b-461e-9af6-f10658631227`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.blob())
  .then(blob => {
    const videoUrl = URL.createObjectURL(blob);
    videoElement.src = videoUrl;
  });
</script>
```

---

### GET /stream/:videoId/check-permission

Check if the user has permission to stream a video without actually streaming it.

**Request:**

```http
GET /stream/341845bd-3a2b-461e-9af6-f10658631227/check-permission
Authorization: Bearer <token>
```

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| videoId | UUID | The video's unique identifier |

**Success Response (200) - Has Permission:**

```json
{
  "videoId": "341845bd-3a2b-461e-9af6-f10658631227",
  "hasPermission": true,
  "locked": false
}
```

**Success Response (200) - No Permission:**

```json
{
  "videoId": "7b2f1d8e-4c3a-4e9f-b1d2-5f8a3c7e9b1d",
  "hasPermission": false,
  "locked": true
}
```

**Error Response (404):**

```json
{
  "error": "Video not found"
}
```

**Error Response (500):**

```json
{
  "error": "Failed to check permission"
}
```

---

## Notification Endpoints

### GET /notifications

Get all notifications for the current user (admin).

**Request:**

```http
GET /notifications
Authorization: Bearer <admin_token>
```

**Success Response (200):**

```json
{
  "notifications": [
    {
      "id": "notif-001",
      "adminId": "admin-123",
      "message": "bob@example.com has requested access to video: Introduction to JavaScript",
      "readStatus": "unread",
      "relatedRequestId": "req-001",
      "createdAt": "2025-12-20T09:45:00.000Z",
      "relatedRequest": {
        "id": "req-001",
        "studentId": "student-789",
        "videoId": "341845bd-3a2b-461e-9af6-f10658631227",
        "status": "pending",
        "createdAt": "2025-12-20T09:45:00.000Z",
        "updatedAt": "2025-12-20T09:45:00.000Z",
        "student": {
          "id": "student-789",
          "name": "Bob Johnson",
          "email": "bob@example.com"
        },
        "video": {
          "id": "341845bd-3a2b-461e-9af6-f10658631227",
          "title": "Introduction to JavaScript"
        }
      }
    }
  ]
}
```

**Error Response (500):**

```json
{
  "error": "Failed to fetch notifications"
}
```

---

### GET /notifications/unread

Get only unread notifications with count.

**Request:**

```http
GET /notifications/unread
Authorization: Bearer <admin_token>
```

**Success Response (200):**

```json
{
  "notifications": [
    {
      "id": "notif-001",
      "adminId": "admin-123",
      "message": "bob@example.com has requested access to video: Introduction to JavaScript",
      "readStatus": "unread",
      "relatedRequestId": "req-001",
      "createdAt": "2025-12-20T09:45:00.000Z",
      "relatedRequest": {
        "id": "req-001",
        "studentId": "student-789",
        "videoId": "341845bd-3a2b-461e-9af6-f10658631227",
        "status": "pending",
        "createdAt": "2025-12-20T09:45:00.000Z",
        "student": {
          "id": "student-789",
          "name": "Bob Johnson",
          "email": "bob@example.com"
        },
        "video": {
          "id": "341845bd-3a2b-461e-9af6-f10658631227",
          "title": "Introduction to JavaScript"
        }
      }
    }
  ],
  "count": 1
}
```

**Error Response (500):**

```json
{
  "error": "Failed to fetch unread notifications"
}
```

---

### PATCH /notifications/mark-read/:notificationId

Mark a specific notification as read.

**Request:**

```http
PATCH /notifications/mark-read/notif-001
Authorization: Bearer <admin_token>
```

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| notificationId | UUID | The notification's unique identifier |

**Success Response (200):**

```json
{
  "message": "Notification marked as read"
}
```

**Error Response (404):**

```json
{
  "error": "Notification not found"
}
```

**Error Response (500):**

```json
{
  "error": "Failed to mark notification as read"
}
```

---

### PATCH /notifications/mark-all-read

Mark all unread notifications as read for the current user.

**Request:**

```http
PATCH /notifications/mark-all-read
Authorization: Bearer <admin_token>
```

**Success Response (200):**

```json
{
  "message": "All notifications marked as read"
}
```

**Error Response (500):**

```json
{
  "error": "Failed to mark all notifications as read"
}
```

---

### DELETE /notifications/:notificationId

Delete a specific notification.

**Request:**

```http
DELETE /notifications/notif-001
Authorization: Bearer <admin_token>
```

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| notificationId | UUID | The notification's unique identifier |

**Success Response (200):**

```json
{
  "message": "Notification deleted successfully"
}
```

**Error Response (404):**

```json
{
  "error": "Notification not found"
}
```

**Error Response (500):**

```json
{
  "error": "Failed to delete notification"
}
```

---

## System Endpoints

### GET /

Get API information and available endpoints.

**Request:**

```http
GET /
```

**Success Response (200):**

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

---

### GET /health

Health check endpoint to verify API is running.

**Request:**

```http
GET /health
```

**Success Response (200):**

```json
{
  "status": "ok",
  "timestamp": "2025-12-20T14:30:45.123Z"
}
```

---

## Error Handling

### Standard Error Response Format

All error responses follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

In development mode, some errors may include additional details:

```json
{
  "error": "Failed to upload video",
  "details": "Detailed error message for debugging"
}
```

### HTTP Status Codes

| Status Code | Meaning | Common Causes |
|-------------|---------|---------------|
| 200 | Success | Request completed successfully |
| 204 | No Content | Request successful but no content to return |
| 400 | Bad Request | Invalid request body, missing required fields, validation error |
| 401 | Unauthorized | Missing or invalid authentication token |
| 403 | Forbidden | User doesn't have permission (e.g., student trying to access admin endpoint) |
| 404 | Not Found | Requested resource doesn't exist |
| 500 | Internal Server Error | Server error, database error, external service error |

### Common Error Scenarios

#### Authentication Errors

**No Token Provided:**
```json
{
  "error": "Unauthorized: No token provided"
}
```

**Invalid Token:**
```json
{
  "error": "Unauthorized: Invalid token"
}
```

**Expired Token:**
```json
{
  "error": "Unauthorized: Invalid token"
}
```

#### Authorization Errors

**Insufficient Permissions:**
```json
{
  "error": "Forbidden: Admin access required. Current role: student"
}
```

#### Validation Errors

**Missing Required Fields:**
```json
{
  "error": "Validation Error",
  "message": "Invalid request format. Ensure studentId and videoId are provided as strings in valid JSON format.",
  "details": "Expected property 'studentId' to be String",
  "example": {
    "studentId": "d249c430-ae65-47b3-8f46-c1a1a45e8cf7",
    "videoId": "341845bd-3a2b-461e-9af6-f10658631227"
  }
}
```

**Invalid Email Format:**
```json
{
  "error": "Expected property 'email' to be email"
}
```

**Password Too Short:**
```json
{
  "error": "Expected property 'password' to have minimum length of 6"
}
```

---

## Data Models

### User Model

```typescript
{
  id: string;              // UUID
  name: string;            // Min 2 characters
  email: string;           // Valid email format
  passwordHash: string;    // Hashed password (not returned in responses)
  role: "admin" | "student";
  createdAt: string;       // ISO 8601 timestamp
  updatedAt: string;       // ISO 8601 timestamp
}
```

### Video Model

```typescript
{
  id: string;                  // UUID
  title: string;               // Required
  description: string | null;  // Optional
  thumbnailUrl: string | null; // Optional
  backblazeFileId: string;     // Backblaze B2 file ID
  backblazeFileName: string;   // Backblaze B2 file name
  createdBy: string;           // User ID (UUID)
  createdAt: string;           // ISO 8601 timestamp
  updatedAt: string;           // ISO 8601 timestamp
}
```

### Permission Model

```typescript
{
  id: string;        // UUID
  studentId: string; // User ID (UUID)
  videoId: string;   // Video ID (UUID)
  grantedBy: string; // Admin User ID (UUID)
  grantedAt: string; // ISO 8601 timestamp
}
```

### Access Request Model

```typescript
{
  id: string;                                    // UUID
  studentId: string;                            // User ID (UUID)
  videoId: string;                              // Video ID (UUID)
  status: "pending" | "approved" | "rejected";
  createdAt: string;                            // ISO 8601 timestamp
  updatedAt: string;                            // ISO 8601 timestamp
}
```

### Notification Model

```typescript
{
  id: string;                      // UUID
  adminId: string;                 // User ID (UUID)
  message: string;                 // Notification message
  readStatus: "unread" | "read";
  relatedRequestId: string | null; // Access Request ID (UUID), optional
  createdAt: string;               // ISO 8601 timestamp
}
```

---

## Quick Integration Guide

### 1. Authentication Flow

```javascript
// Register
const registerResponse = await fetch('http://localhost:3000/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'SecurePass123!',
    role: 'student'
  })
});
const { token, user } = await registerResponse.json();
localStorage.setItem('token', token);

// Login
const loginResponse = await fetch('http://localhost:3000/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'SecurePass123!'
  })
});
const { token, user } = await loginResponse.json();
localStorage.setItem('token', token);

// Get Current User
const meResponse = await fetch('http://localhost:3000/auth/me', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});
const { user } = await meResponse.json();
```

### 2. Making Authenticated Requests

```javascript
// Create a helper function
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`http://localhost:3000${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Request failed');
  }
  
  return response.json();
}

// Usage
try {
  const data = await apiRequest('/student/videos/list');
  console.log(data.videos);
} catch (error) {
  console.error('Error:', error.message);
}
```

### 3. Uploading Videos (Admin)

```javascript
async function uploadVideo(title, description, thumbnailUrl, videoFile) {
  const formData = new FormData();
  formData.append('title', title);
  if (description) formData.append('description', description);
  if (thumbnailUrl) formData.append('thumbnailUrl', thumbnailUrl);
  formData.append('videoFile', videoFile);
  
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:3000/admin/videos/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Upload failed');
  }
  
  return response.json();
}

// Usage
const fileInput = document.getElementById('videoFile');
const file = fileInput.files[0];

try {
  const result = await uploadVideo(
    'Introduction to JavaScript',
    'Learn JS basics',
    'https://example.com/thumb.jpg',
    file
  );
  console.log('Video uploaded:', result.video);
} catch (error) {
  console.error('Upload error:', error.message);
}
```

### 4. Streaming Videos

```javascript
// Method 1: Direct video element src with token
function playVideo(videoId) {
  const token = localStorage.getItem('token');
  const videoElement = document.getElementById('videoPlayer');
  
  // Note: This won't work directly due to CORS and auth headers
  // Use Method 2 instead
  videoElement.src = `http://localhost:3000/stream/${videoId}?token=${token}`;
}

// Method 2: Fetch and create blob URL (Recommended)
async function playVideo(videoId) {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`http://localhost:3000/stream/${videoId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Cannot play video');
  }
  
  const blob = await response.blob();
  const videoUrl = URL.createObjectURL(blob);
  
  const videoElement = document.getElementById('videoPlayer');
  videoElement.src = videoUrl;
  videoElement.play();
}
```

### 5. Real-time Notifications (Polling)

```javascript
// Poll for new notifications every 30 seconds
async function pollNotifications() {
  try {
    const data = await apiRequest('/notifications/unread');
    updateNotificationBadge(data.count);
    displayNotifications(data.notifications);
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
  }
}

// Start polling
setInterval(pollNotifications, 30000);
pollNotifications(); // Initial load
```

---

## Rate Limiting & Best Practices

### Best Practices

1. **Store tokens securely**: Use httpOnly cookies in production instead of localStorage
2. **Handle token expiration**: Implement token refresh or re-login flow
3. **Validate before submitting**: Validate forms client-side before API calls
4. **Show loading states**: Display spinners during async operations
5. **Handle errors gracefully**: Show user-friendly error messages
6. **Debounce searches**: Don't make API calls on every keystroke
7. **Cache responses**: Cache video lists and user data when appropriate
8. **Check permissions first**: Use `/stream/:videoId/check-permission` before attempting to stream
9. **Clean up resources**: Revoke blob URLs when video player is unmounted

### Example: Complete Video Player Component (React)

```jsx
import { useState, useEffect } from 'react';

function VideoPlayer({ videoId }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  
  useEffect(() => {
    checkPermissionAndLoadVideo();
    
    return () => {
      // Cleanup blob URL
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoId]);
  
  async function checkPermissionAndLoadVideo() {
    setLoading(true);
    setError(null);
    
    try {
      // Check permission first
      const permCheck = await apiRequest(`/stream/${videoId}/check-permission`);
      setHasPermission(permCheck.hasPermission);
      
      if (!permCheck.hasPermission) {
        setLoading(false);
        return;
      }
      
      // Load video
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/stream/${videoId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Failed to load video');
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  if (loading) return <div>Loading video...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!hasPermission) return <div>🔒 You don't have access to this video</div>;
  
  return (
    <video controls width="100%">
      <source src={videoUrl} type="video/mp4" />
      Your browser doesn't support video playback.
    </video>
  );
}
```

---

## Support

For issues or questions about this API, please contact the development team or refer to the main documentation.

**API Version:** 1.0.0  
**Last Updated:** December 20, 2025
