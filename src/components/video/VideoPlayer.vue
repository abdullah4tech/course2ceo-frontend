<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import '@videojs/themes/dist/sea/index.css'
import type Player from 'video.js/dist/types/player'

interface Props {
  src: string
  poster?: string
  autoplay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: false,
})

const videoRef = ref<HTMLVideoElement>()
const playerRef = ref<Player>()

onMounted(() => {
  if (!videoRef.value) return

  // Initialize Video.js player with mobile-optimized config
  playerRef.value = videojs(videoRef.value, {
    controls: true,
    responsive: true,
    fluid: true,
    preload: 'auto',
    playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
    controlBar: {
      volumePanel: {
        inline: false,
      },
      pictureInPictureToggle: false,
    },
  })

  // Set source
  if (props.src) {
    playerRef.value.src({ src: props.src, type: 'video/mp4' })
  }

  if (props.poster) {
    playerRef.value.poster(props.poster)
  }
})

// Watch for source changes
watch(
  () => props.src,
  (newSrc) => {
    if (playerRef.value && newSrc) {
      playerRef.value.src({ src: newSrc, type: 'video/mp4' })
    }
  },
)

onBeforeUnmount(() => {
  if (playerRef.value) {
    playerRef.value.dispose()
  }
})
</script>

<template>
  <div
    class="w-full bg-black rounded-none sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/5"
  >
    <div data-vjs-player class="relative">
      <video
        ref="videoRef"
        class="video-js vjs-theme-sea vjs-big-play-centered w-full h-full"
        playsinline
      ></video>
    </div>
  </div>
</template>

<style scoped>
/* Video.js Premium Enhancements */
:deep(.video-js) {
  font-family: inherit;
  width: 100% !important;
  height: 100% !important;
}

/* Premium Big Play Button - Netflix/YouTube style */
:deep(.vjs-big-play-button) {
  width: 88px !important;
  height: 88px !important;
  line-height: 88px !important;
  border-radius: 50% !important;
  border: none !important;
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(12px) !important;
  font-size: 48px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 10px 10px -5px rgba(0, 0, 0, 0.2) !important;
}

:deep(.vjs-big-play-button:hover) {
  background: rgba(255, 255, 255, 1) !important;
  transform: scale(1.1) !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
}

:deep(.vjs-big-play-button .vjs-icon-placeholder:before) {
  color: #000 !important;
}

/* Premium Control Bar - More Visible */
:deep(.vjs-control-bar) {
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.85) 70%,
    rgba(0, 0, 0, 0.4) 100%
  ) !important;
  backdrop-filter: blur(16px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(16px) saturate(180%) !important;
  height: 4rem !important;
  padding: 0 1rem !important;
}

/* Make control icons more visible */
:deep(.vjs-control .vjs-icon-placeholder:before),
:deep(.vjs-control .vjs-control-text) {
  color: #ffffff !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8) !important;
}

/* Ensure buttons are clearly visible */
:deep(.vjs-button) {
  color: #ffffff !important;
}

/* Enhanced Touch Targets for Mobile */
:deep(.vjs-control) {
  min-width: 48px !important;
  min-height: 48px !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

:deep(.vjs-control:hover) {
  transform: scale(1.05) !important;
}

/* Premium Progress Bar */
:deep(.vjs-progress-control) {
  position: absolute !important;
  top: -0.5rem !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  height: 0.5rem !important;
}

:deep(.vjs-progress-holder) {
  height: 0.5rem !important;
  background: rgba(255, 255, 255, 0.2) !important;
  border-radius: 9999px !important;
}

:deep(.vjs-play-progress) {
  background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%) !important;
  border-radius: 9999px !important;
  box-shadow: 0 0 12px rgba(99, 102, 241, 0.6) !important;
}

:deep(.vjs-play-progress:before) {
  display: none !important;
}

:deep(.vjs-load-progress) {
  background: rgba(255, 255, 255, 0.3) !important;
  border-radius: 9999px !important;
}

/* Premium Loading Spinner */
:deep(.vjs-loading-spinner) {
  border-color: rgba(255, 255, 255, 0.2) !important;
  border-top-color: #fff !important;
  width: 64px !important;
  height: 64px !important;
  border-width: 4px !important;
  margin: -32px 0 0 -32px !important;
}

/* Volume Slider Enhancement */
:deep(.vjs-volume-level) {
  background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%) !important;
}

/* Time Display */
:deep(.vjs-time-control) {
  padding: 0 0.5rem !important;
  min-width: auto !important;
  font-weight: 600 !important;
  font-size: 0.875rem !important;
  color: #fff !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;
}

/* Fullscreen Button */
:deep(.vjs-fullscreen-control) {
  margin-left: auto !important;
}

/* Video Container Padding on Mobile */
@media (max-width: 640px) {
  :deep(.vjs-control-bar) {
    height: 3.5rem !important;
    padding: 0 0.75rem !important;
  }

  :deep(.vjs-big-play-button) {
    width: 72px !important;
    height: 72px !important;
    line-height: 72px !important;
    font-size: 36px !important;
  }
}

/* Smooth transitions for all elements */
:deep(.vjs-control),
:deep(.vjs-slider),
:deep(.vjs-menu-button) {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

/* Hide controls on inactive */
:deep(.vjs-user-inactive.vjs-playing .vjs-control-bar) {
  opacity: 0 !important;
  pointer-events: none !important;
  transform: translateY(100%) !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

:deep(.vjs-user-active .vjs-control-bar),
:deep(.vjs-paused .vjs-control-bar) {
  opacity: 1 !important;
  pointer-events: all !important;
  transform: translateY(0) !important;
}
</style>
