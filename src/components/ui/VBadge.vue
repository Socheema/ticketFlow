<script setup lang="ts">
import { computed } from 'vue'

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'secondary'
}

// Do not force default color utility classes here. When a parent provides
// classes (for example status-specific bg/text classes), those should take
// precedence. Only provide the structural/base classes by default.
const props = defineProps<BadgeProps>()

const badgeClasses = computed(() => {
  const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium'

  const variants: Record<string, string> = {
    // keep mappings available if consumers pass `variant`, but don't
    // apply them automatically unless `variant` is explicitly provided
    default: 'bg-indigo-100 text-indigo-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
  secondary: 'bg-card text-muted',
  }

  const colorClass = props.variant ? variants[props.variant] : ''
  return `${base} ${colorClass}`.trim()
})
</script>

<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>
