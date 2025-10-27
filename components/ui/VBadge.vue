<script setup lang="ts">
import { computed } from 'vue'

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'secondary'
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
})

const badgeClasses = computed(() => {
  const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium'
  
  const variants = {
    default: 'bg-indigo-100 text-indigo-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    secondary: 'bg-gray-100 text-gray-700',
  }
  
  return `${base} ${variants[props.variant]}`
})
</script>

<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>
