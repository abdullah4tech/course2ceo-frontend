<template>
  <div class="min-h-screen bg-gray-50/50 p-6">
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Upload Video</h1>
          <p class="text-gray-500 text-sm mt-1">Share a new video with your students</p>
        </div>
        <BaseButton variant="ghost" size="sm" @click="$router.push('/videos')">
          <component :is="XMarkIcon" class="w-4 h-4 mr-1.5" />
          Cancel
        </BaseButton>
      </div>

      <!-- Upload Form -->
      <form @submit.prevent="handleUpload" class="space-y-6">
        <!-- Video File Upload Area -->
        <BaseCard>
          <template #header>
            <div class="flex items-center gap-2">
              <VideoCameraIcon class="w-5 h-5 text-brand-primary" />
              <h2 class="text-lg font-semibold text-gray-900">Video File</h2>
              <span class="text-sm text-error">*</span>
            </div>
          </template>

          <div
            class="relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200"
            :class="
              isDragging
                ? 'border-brand-primary bg-brand-primary/5'
                : 'border-gray-300 hover:border-brand-primary/50 hover:bg-gray-50'
            "
            @click="() => fileInput?.click()"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
          >
            <input
              ref="fileInput"
              type="file"
              accept="video/mp4,video/quicktime,video/x-msvideo,video/webm"
              class="hidden"
              @change="handleFileSelect"
            />

            <!-- Upload Icon & Text -->
            <div v-if="!selectedFile" class="space-y-4">
              <div
                class="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center"
              >
                <ArrowUpTrayIcon class="w-8 h-8 text-white" />
              </div>
              <div>
                <p class="text-lg font-medium text-gray-900 mb-1">
                  Click to upload or drag and drop
                </p>
                <p class="text-sm text-gray-500">MP4, MOV, AVI, or WebM (max 500MB)</p>
              </div>
            </div>

            <!-- Selected File Preview -->
            <div v-else class="space-y-4">
              <div class="flex items-center justify-center gap-3">
                <div
                  class="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center"
                >
                  <CheckCircleIcon class="w-6 h-6 text-white" />
                </div>
                <div class="text-left">
                  <p class="font-semibold text-gray-900">{{ selectedFile.name }}</p>
                  <p class="text-sm text-gray-500">{{ formatFileSize(selectedFile.size) }}</p>
                </div>
              </div>
              <BaseButton type="button" variant="ghost" size="sm" @click.stop="clearFile">
                <XMarkIcon class="w-4 h-4 mr-1.5" />
                Remove file
              </BaseButton>
            </div>

            <!-- Upload Progress -->
            <div v-if="uploadProgress > 0 && uploadProgress < 100" class="mt-4">
              <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  class="bg-gradient-to-r from-brand-primary to-brand-accent h-2 transition-all duration-300"
                  :style="{ width: `${uploadProgress}%` }"
                ></div>
              </div>
              <p class="text-sm text-gray-600 mt-2">Uploading... {{ uploadProgress }}%</p>
            </div>
          </div>
        </BaseCard>

        <!-- Video Details -->
        <BaseCard>
          <template #header>
            <div class="flex items-center gap-2">
              <DocumentTextIcon class="w-5 h-5 text-brand-primary" />
              <h2 class="text-lg font-semibold text-gray-900">Video Details</h2>
            </div>
          </template>

          <div class="space-y-6">
            <!-- Title -->
            <BaseInput
              v-model="form.title"
              label="Video Title"
              placeholder="e.g., Introduction to React Hooks"
              :required="true"
            />

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Description
                <span class="text-gray-400 font-normal">(Optional)</span>
              </label>
              <textarea
                v-model="form.description"
                rows="4"
                placeholder="Describe what students will learn from this video..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none"
              ></textarea>
            </div>

            <!-- Thumbnail URL -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail URL
                <span class="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div class="space-y-3">
                <BaseInput
                  v-model="form.thumbnailUrl"
                  placeholder="https://example.com/thumbnail.jpg"
                />
                <!-- Thumbnail Preview -->
                <div
                  v-if="form.thumbnailUrl && isValidUrl(form.thumbnailUrl)"
                  class="relative rounded-lg overflow-hidden border border-gray-200 aspect-video bg-gray-100"
                >
                  <img
                    :src="form.thumbnailUrl"
                    alt="Thumbnail preview"
                    class="w-full h-full object-cover"
                    @error="thumbnailError = true"
                  />
                  <div
                    v-if="thumbnailError"
                    class="absolute inset-0 flex items-center justify-center bg-gray-100"
                  >
                    <p class="text-sm text-gray-500">Failed to load thumbnail</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- Actions -->
        <div class="flex items-center justify-between gap-4 sticky bottom-6 z-10">
          <BaseButton type="button" variant="ghost" @click="$router.push('/videos')">
            Cancel
          </BaseButton>
          <BaseButton
            type="submit"
            variant="primary"
            :disabled="!isFormValid || uploading"
            :loading="uploading"
            class="min-w-[200px]"
          >
            <ArrowUpTrayIcon v-if="!uploading" class="w-4 h-4 mr-2" />
            {{ uploading ? 'Uploading...' : 'Upload Video' }}
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { adminVideoAPI } from '@/services/api'
import { useToast } from '@/composables/useToast'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import {
  VideoCameraIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  XMarkIcon,
  DocumentTextIcon,
} from '@heroicons/vue/24/outline'

const router = useRouter()
const toast = useToast()

const uploading = ref(false)
const uploadProgress = ref(0)
const isDragging = ref(false)
const selectedFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const thumbnailError = ref(false)

const form = reactive({
  title: '',
  description: '',
  thumbnailUrl: '',
})

const isFormValid = computed(() => {
  return form.title.trim().length > 0 && selectedFile.value !== null
})

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]

    // Validate file size (500MB max)
    const maxSize = 500 * 1024 * 1024 // 500MB in bytes
    if (file.size > maxSize) {
      toast.error('File Too Large', 'Please select a video file smaller than 500MB')
      return
    }

    // Validate file type
    const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm']
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid File Type', 'Please select a valid video file (MP4, MOV, AVI, or WebM)')
      return
    }

    selectedFile.value = file
    thumbnailError.value = false
  }
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  const files = event.dataTransfer?.files
  if (files && files[0]) {
    // Create a synthetic event to reuse validation logic
    const syntheticEvent = {
      target: {
        files: files,
      },
    } as unknown as Event
    handleFileSelect(syntheticEvent)
  }
}

const clearFile = () => {
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  uploadProgress.value = 0
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const handleUpload = async () => {
  if (!isFormValid.value) {
    toast.error('Validation Error', 'Please fill in all required fields')
    return
  }

  uploading.value = true
  uploadProgress.value = 0

  try {
    // Simulate upload progress (in a real scenario, you'd track actual upload progress)
    const progressInterval = setInterval(() => {
      if (uploadProgress.value < 90) {
        uploadProgress.value += 10
      }
    }, 300)

    const uploadData = {
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      thumbnailUrl: form.thumbnailUrl.trim() || undefined,
      videoFile: selectedFile.value!,
    }

    const response = await adminVideoAPI.upload(uploadData)

    clearInterval(progressInterval)
    uploadProgress.value = 100

    toast.success('Success!', 'Video uploaded successfully')

    // Wait a moment to show 100% progress, then redirect
    setTimeout(() => {
      router.push('/videos')
    }, 500)
  } catch (error: any) {
    console.error('Upload failed:', error)
    toast.error('Upload Failed', error.message || 'Failed to upload video. Please try again.')
    uploadProgress.value = 0
  } finally {
    uploading.value = false
  }
}
</script>
