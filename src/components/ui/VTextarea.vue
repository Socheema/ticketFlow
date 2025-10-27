<script setup lang="ts">
interface TextareaProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  id?: string
  rows?: number
}

const props = withDefaults(defineProps<TextareaProps>(), {
  disabled: false,
  rows: 4,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <textarea
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :id="id"
    :rows="rows"
    @input="handleInput"
  class="flex min-h-[80px] w-full rounded-md border border-muted bg-card px-3 py-2 text-sm ring-offset-white placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  />
</template>
