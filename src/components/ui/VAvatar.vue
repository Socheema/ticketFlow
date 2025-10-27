<script setup lang="ts">
interface AvatarProps {
  fallback: string
}

defineProps<AvatarProps>()
</script>

<template>
  <div class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
    <span class="flex h-full w-full items-center justify-center bg-indigo-600 text-white text-sm">
      {{ fallback }}
    </span>
  </div>
</template>
