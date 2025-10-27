<script setup lang="ts">
interface CardProps {
  className?: string
}

defineProps<CardProps>()
</script>

<template>
  <div :class="['rounded-lg border border-gray-200 bg-white shadow-sm', className]">
    <slot />
  </div>
</template>
