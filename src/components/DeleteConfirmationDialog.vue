<template>
  <VDialog :open="isOpen" @update:open="(val) => !val && $emit('close')">
    <div class="sm:max-w-[425px]">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle class="w-5 h-5 text-red-600" />
        </div>
  <h2 class="text-foreground">Delete Ticket</h2>
      </div>

      <p class="text-muted mb-6">
        Are you sure you want to delete {{ ticketTitle ? `"${ticketTitle}"` : 'this ticket' }}?
        This action cannot be undone.
      </p>

      <div class="flex justify-end gap-3">
        <VButton variant="outline" @click="$emit('close')">
          Cancel
        </VButton>
        <VButton
          class="bg-red-600 hover:bg-red-700"
          @click="$emit('confirm')"
        >
          Delete
        </VButton>
      </div>
    </div>
  </VDialog>
</template>

<script setup lang="ts">
import VDialog from './ui/VDialog.vue'
import VButton from './ui/VButton.vue'
import { AlertTriangle } from 'lucide-vue-next'

defineProps<{
  isOpen: boolean
  ticketTitle?: string
}>()

defineEmits<{
  close: []
  confirm: []
}>()
</script>
