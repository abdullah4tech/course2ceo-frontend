import { ref } from 'vue'

interface Toast {
  id: number
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
  duration?: number
}

const toasts = ref<Toast[]>([])
let toastId = 0

export function useToast() {
  const show = (
    title: string,
    options: {
      type?: 'success' | 'error' | 'warning' | 'info'
      description?: string
      duration?: number
    } = {},
  ) => {
    const id = toastId++
    const toast: Toast = {
      id,
      title,
      type: options.type || 'info',
      description: options.description,
      duration: options.duration || 5000,
    }

    toasts.value.push(toast)
  }

  const success = (title: string, description?: string) => {
    show(title, { type: 'success', description })
  }

  const error = (title: string, description?: string) => {
    show(title, { type: 'error', description })
  }

  const warning = (title: string, description?: string) => {
    show(title, { type: 'warning', description })
  }

  const info = (title: string, description?: string) => {
    show(title, { type: 'info', description })
  }

  const remove = (id: number) => {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  return {
    toasts,
    show,
    success,
    error,
    warning,
    info,
    remove,
  }
}
