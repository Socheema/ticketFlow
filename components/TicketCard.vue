<template>
  <VCard class="p-6 hover:shadow-lg transition-shadow">
    <div class="flex items-start justify-between mb-3">
      <h3 class="text-gray-900 flex-1 pr-2">{{ ticket.title }}</h3>
      <VBadge :class="getStatusColor(ticket.status)">
        {{ getStatusLabel(ticket.status) }}
      </VBadge>
    </div>

    <p class="text-gray-600 mb-4 line-clamp-2">
      {{ ticket.description || 'No description provided' }}
    </p>

    <div class="flex items-center justify-between">
      <span class="text-gray-500">
        {{ formatDate(ticket.createdAt) }}
      </span>

      <div class="flex gap-2">
        <VButton
          size="sm"
          variant="ghost"
          @click="$emit('edit', ticket)"
          class="hover:bg-indigo-50 hover:text-indigo-600"
        >
          <Edit2 class="w-4 h-4" />
        </VButton>
        <VButton
          size="sm"
          variant="ghost"
          @click="$emit('delete', ticket)"
          class="hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 class="w-4 h-4" />
        </VButton>
      </div>
    </div>
  </VCard>
</template>

<script setup lang="ts">
import { Ticket } from '../stores/tickets'
import VCard from './ui/VCard.vue'
import VButton from './ui/VButton.vue'
import VBadge from './ui/VBadge.vue'
import { Edit2, Trash2 } from 'lucide-vue-next'

defineProps<{
  ticket: Ticket
}>()

defineEmits<{
  edit: [ticket: Ticket]
  delete: [ticket: Ticket]
}>()

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'bg-green-100 text-green-700 border-green-200'
    case 'in_progress':
      return 'bg-amber-100 text-amber-700 border-amber-200'
    case 'closed':
      return 'bg-gray-100 text-gray-700 border-gray-200'
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'open':
      return 'Open'
    case 'in_progress':
      return 'In Progress'
    case 'closed':
      return 'Closed'
    default:
      return status
  }
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>
