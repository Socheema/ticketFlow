import { defineStore } from 'pinia'
import { ref } from 'vue'

export type TicketStatus = 'open' | 'in_progress' | 'closed'

export interface Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
  createdAt: Date
  updatedAt: Date
}

const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Website login not working',
    description: 'Users are reporting they cannot log into the website',
    status: 'open',
    createdAt: new Date(2024, 9, 20),
    updatedAt: new Date(2024, 9, 20),
  },
  {
    id: '2',
    title: 'Add dark mode feature',
    description: 'Implement dark mode toggle for better user experience',
    status: 'in_progress',
    createdAt: new Date(2024, 9, 21),
    updatedAt: new Date(2024, 9, 22),
  },
  {
    id: '3',
    title: 'Fix mobile responsive issues',
    description: 'Dashboard not displaying correctly on mobile devices',
    status: 'closed',
    createdAt: new Date(2024, 9, 18),
    updatedAt: new Date(2024, 9, 19),
  },
  {
    id: '4',
    title: 'Update user profile page',
    description: 'Add ability to upload profile pictures',
    status: 'open',
    createdAt: new Date(2024, 9, 23),
    updatedAt: new Date(2024, 9, 23),
  },
]

export const useTicketsStore = defineStore('tickets', () => {
  const tickets = ref<Ticket[]>(mockTickets)

  const createTicket = (title: string, description: string, status: TicketStatus) => {
    const newTicket: Ticket = {
      id: Date.now().toString(),
      title,
      description,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    tickets.value = [newTicket, ...tickets.value]
  }

  const updateTicket = (id: string, title: string, description: string, status: TicketStatus) => {
    tickets.value = tickets.value.map(t =>
      t.id === id ? { ...t, title, description, status, updatedAt: new Date() } : t
    )
  }

  const deleteTicket = (id: string) => {
    tickets.value = tickets.value.filter(t => t.id !== id)
  }

  const getTicketById = (id: string) => tickets.value.find(t => t.id === id)

  return { tickets, createTicket, updateTicket, deleteTicket, getTicketById }
})
