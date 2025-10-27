<script setup lang="ts">
import { computed } from 'vue'

interface ButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary'
  size?: 'default' | 'sm' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'default',
  type: 'button',
  disabled: false,
})

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  
  const variants = {
    default: 'bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus-visible:ring-indigo-500',
    ghost: 'hover:bg-gray-100 text-gray-700 focus-visible:ring-indigo-500',
    secondary: 'bg-white text-indigo-600 hover:bg-gray-50 focus-visible:ring-indigo-500',
  }
  
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3 text-sm',
    lg: 'h-11 px-8',
  }
  
  return `${base} ${variants[props.variant]} ${sizes[props.size]}`
})
</script>

<template>
  <button 
    :class="buttonClasses" 
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
