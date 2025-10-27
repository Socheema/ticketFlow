<script setup lang="ts">
interface CardProps {
  className?: string
}

defineProps<CardProps>()
</script>

<template>
  <div :class="['rounded-lg border border-muted bg-card shadow-sm', className]">
    <slot />
  </div>
</template>
