<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header variant="app" />

    <main class="flex-1 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 class="text-gray-900 mb-2">Tickets</h1>
            <p class="text-gray-600">
              Manage and track all your support tickets
            </p>
          </div>
          <VButton @click="isCreateModalOpen = true">
            <Plus class="w-4 h-4 mr-2" />
            Create New Ticket
          </VButton>
        </div>

        <!-- Search Bar -->
        <div class="mb-8">
          <div class="relative max-w-md">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <VInput
              type="search"
              placeholder="Search tickets..."
              v-model="searchQuery"
              class="pl-10"
            />
          </div>
        </div>

        <!-- Tickets Grid -->
        <div v-if="filteredTickets.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TicketCard
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            :ticket="ticket"
            @edit="editingTicket = $event"
            @delete="deletingTicket = $event"
          />
        </div>

        <div v-else class="text-center py-16">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TicketIcon class="w-8 h-8 text-gray-400" />
          </div>
          <h3 class="text-gray-900 mb-2">
            {{ searchQuery ? 'No tickets found' : 'No tickets yet' }}
          </h3>
          <p class="text-gray-600 mb-6">
            {{ searchQuery
              ? 'Try adjusting your search terms'
              : 'Create your first ticket to get started' }}
          </p>
          <VButton v-if="!searchQuery" @click="isCreateModalOpen = true">
            <Plus class="w-4 h-4 mr-2" />
            Create First Ticket
          </VButton>
        </div>
      </div>
    </main>

    <Footer />

    <!-- Modals -->
    <CreateEditTicketModal
      :is-open="isCreateModalOpen"
      @close="isCreateModalOpen = false"
      @save="handleCreateTicket"
    />

    <CreateEditTicketModal
      :is-open="!!editingTicket"
      :ticket="editingTicket"
      @close="editingTicket = null"
      @save="handleUpdateTicket"
    />

    <DeleteConfirmationDialog
      :is-open="!!deletingTicket"
      :ticket-title="deletingTicket?.title"
      @close="deletingTicket = null"
      @confirm="handleDeleteTicket"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTicketsStore, Ticket, TicketStatus } from '../stores/tickets'
import { toast } from 'sonner'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import VButton from '../components/ui/VButton.vue'
import VInput from '../components/ui/VInput.vue'
import TicketCard from '../components/TicketCard.vue'
import CreateEditTicketModal from '../components/CreateEditTicketModal.vue'
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog.vue'
import { Plus, Search, Ticket as TicketIcon } from 'lucide-vue-next'

const ticketsStore = useTicketsStore()

const searchQuery = ref('')
const isCreateModalOpen = ref(false)
const editingTicket = ref<Ticket | null>(null)
const deletingTicket = ref<Ticket | null>(null)

const filteredTickets = computed(() => 
  ticketsStore.tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const handleCreateTicket = (title: string, description: string, status: TicketStatus) => {
  ticketsStore.createTicket(title, description, status)
  toast.success('Ticket created successfully')
}

const handleUpdateTicket = (title: string, description: string, status: TicketStatus) => {
  if (editingTicket.value) {
    ticketsStore.updateTicket(editingTicket.value.id, title, description, status)
    toast.success('Ticket updated successfully')
    editingTicket.value = null
  }
}

const handleDeleteTicket = () => {
  if (deletingTicket.value) {
    ticketsStore.deleteTicket(deletingTicket.value.id)
    toast.success('Ticket deleted successfully')
    deletingTicket.value = null
  }
}
</script>
