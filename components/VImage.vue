<script setup lang="ts">
import { ref } from 'vue'

interface ImageProps {
  src: string
  alt: string
  className?: string
}

const props = defineProps<ImageProps>()

const hasError = ref(false)

const handleError = () => {
  hasError.value = true
}
</script>

<template>
  <img
    v-if="!hasError"
    :src="src"
    :alt="alt"
    :class="className"
    @error="handleError"
  />
  <div
    v-else
    :class="['bg-gray-200 flex items-center justify-center', className]"
  >
    <span class="text-gray-400">Image unavailable</span>
  </div>
</template>
