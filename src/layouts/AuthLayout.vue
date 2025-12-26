<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          <slot name="title"></slot>
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          <slot name="subtitle"></slot>
        </p>
      </div>
      <div class="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Auth layout for login/register pages
</script>
