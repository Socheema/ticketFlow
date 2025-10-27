<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header variant="app" />

    <main class="flex-1 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-8">
          <h1 class="text-gray-900 mb-2">Dashboard</h1>
          <p class="text-gray-600">
            Overview of your ticket management system
          </p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <VCard v-for="(stat, index) in stats" :key="index" class="p-6">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-gray-600 mb-1">{{ stat.title }}</p>
                <p class="text-gray-900">{{ stat.value }}</p>
              </div>
              <div :class="`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`">
                <component :is="stat.icon" class="w-6 h-6" />
              </div>
            </div>
          </VCard>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <VCard class="p-8 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
            <h2 class="text-white mb-2">Manage Tickets</h2>
            <p class="text-indigo-100 mb-6">
              View, create, edit, and delete your support tickets
            </p>
            <VButton variant="secondary" @click="router.push('/tickets')">
              Go to Tickets
              <ArrowRight class="ml-2 h-4 w-4" />
            </VButton>
          </VCard>

          <VCard class="p-8">
            <h2 class="text-gray-900 mb-2">In Progress</h2>
            <p class="text-gray-600 mb-6">
              You have {{ inProgressTickets }} {{ inProgressTickets === 1 ? 'ticket' : 'tickets' }} currently being worked on
            </p>
            <VButton variant="outline" @click="router.push('/tickets')">
              View All
              <ArrowRight class="ml-2 h-4 w-4" />
            </VButton>
          </VCard>
        </div>

        <!-- Recent Activity -->
        <VCard class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-gray-900">Recent Tickets</h2>
            <VButton variant="ghost" @click="router.push('/tickets')">
              View All
            </VButton>
          </div>

          <div v-if="recentTickets.length > 0" class="space-y-4">
            <div
              v-for="ticket in recentTickets"
              :key="ticket.id"
              class="flex items-start justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <div class="flex-1">
                <h3 class="text-gray-900 mb-1">{{ ticket.title }}</h3>
                <p class="text-gray-600 line-clamp-1">{{ ticket.description }}</p>
              </div>
              <div class="ml-4 flex items-center gap-2">
                <span
                  :class="`px-3 py-1 rounded-full ${
                    ticket.status === 'open'
                      ? 'bg-green-100 text-green-700'
                      : ticket.status === 'in_progress'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-gray-100 text-gray-700'
                  }`"
                >
                  {{ ticket.status.replace('_', ' ') }}
                </span>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-12">
            <Ticket class="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p class="text-gray-600 mb-4">No tickets yet</p>
            <VButton @click="router.push('/tickets')">
              Create Your First Ticket
            </VButton>
          </div>
        </VCard>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTicketsStore } from '../stores/tickets'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import VCard from '../components/ui/VCard.vue'
import VButton from '../components/ui/VButton.vue'
import { Ticket, CheckCircle2, Clock, ArrowRight } from 'lucide-vue-next'

const router = useRouter()
const ticketsStore = useTicketsStore()

const openTickets = computed(() => ticketsStore.tickets.filter(t => t.status === 'open').length)
const inProgressTickets = computed(() => ticketsStore.tickets.filter(t => t.status === 'in_progress').length)
const closedTickets = computed(() => ticketsStore.tickets.filter(t => t.status === 'closed').length)
const totalTickets = computed(() => ticketsStore.tickets.length)

const stats = computed(() => [
  {
    title: 'Total Tickets',
    value: totalTickets.value,
    icon: Ticket,
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    title: 'Open Tickets',
    value: openTickets.value,
    icon: Clock,
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'Resolved Tickets',
    value: closedTickets.value,
    icon: CheckCircle2,
    color: 'bg-gray-100 text-gray-600',
  },
])

const recentTickets = computed(() => ticketsStore.tickets.slice(0, 5))
</script>
