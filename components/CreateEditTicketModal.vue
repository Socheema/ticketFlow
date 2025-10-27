<template>
  <VDialog :open="isOpen" @update:open="handleClose">
    <div class="sm:max-w-[500px]">
      <div class="mb-4">
        <h2 class="text-gray-900">
          {{ ticket ? 'Edit Ticket' : 'Create New Ticket' }}
        </h2>
      </div>

      <div class="space-y-5 py-4">
        <div class="space-y-2">
          <VLabel for="title">
            Title <span class="text-red-500">*</span>
          </VLabel>
          <VInput
            id="title"
            placeholder="Enter ticket title"
            v-model="title"
            :class="titleError ? 'border-red-500' : ''"
          />
          <p v-if="titleError" class="text-red-600">{{ titleError }}</p>
        </div>

        <div class="space-y-2">
          <VLabel for="status">Status</VLabel>
          <VSelect v-model="status">
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </VSelect>
        </div>

        <div class="space-y-2">
          <VLabel for="description">Description</VLabel>
          <VTextarea
            id="description"
            placeholder="Enter ticket description (optional)"
            v-model="description"
            :rows="4"
          />
        </div>
      </div>

      <div class="flex justify-end gap-3">
        <VButton variant="outline" @click="handleClose">
          Cancel
        </VButton>
        <VButton @click="handleSave">
          {{ ticket ? 'Save Changes' : 'Create Ticket' }}
        </VButton>
      </div>
    </div>
  </VDialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Ticket, TicketStatus } from '../stores/tickets'
import VDialog from './ui/VDialog.vue'
import VButton from './ui/VButton.vue'
import VInput from './ui/VInput.vue'
import VLabel from './ui/VLabel.vue'
import VTextarea from './ui/VTextarea.vue'
import VSelect from './ui/VSelect.vue'

const props = defineProps<{
  isOpen: boolean
  ticket?: Ticket | null
}>()

const emit = defineEmits<{
  close: []
  save: [title: string, description: string, status: TicketStatus]
}>()

const title = ref('')
const description = ref('')
const status = ref<TicketStatus>('open')
const titleError = ref('')

watch(() => [props.ticket, props.isOpen], () => {
  if (props.ticket) {
    title.value = props.ticket.title
    description.value = props.ticket.description
    status.value = props.ticket.status
  } else {
    title.value = ''
    description.value = ''
    status.value = 'open'
  }
  titleError.value = ''
})

const handleSave = () => {
  titleError.value = ''

  if (!title.value.trim()) {
    titleError.value = 'Title is required'
    return
  }

  emit('save', title.value, description.value, status.value)
  handleClose()
}

const handleClose = () => {
  title.value = ''
  description.value = ''
  status.value = 'open'
  titleError.value = ''
  emit('close')
}
</script>
