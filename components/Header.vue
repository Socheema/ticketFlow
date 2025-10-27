<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import VButton from './ui/VButton.vue'
import VAvatar from './ui/VAvatar.vue'
import { useAuthStore } from '../stores/auth'
import { Ticket, LogOut, User } from 'lucide-vue-next'

interface HeaderProps {
  variant?: 'landing' | 'app'
}

const props = withDefaults(defineProps<HeaderProps>(), {
  variant: 'landing',
})

const authStore = useAuthStore()
const router = useRouter()
const showDropdown = ref(false)

const handleLogout = () => {
  authStore.logout()
  router.push('/')
  showDropdown.value = false
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const userInitials = computed(() => {
  return authStore.user ? getInitials(authStore.user.name) : 'U'
})

const closeDropdown = () => {
  showDropdown.value = false
}

const navigateAndClose = (path: string) => {
  router.push(path)
  closeDropdown()
}
</script>

<template>
  <header class="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Ticket :size="20" class="text-white" />
          </div>
          <span class="font-semibold text-gray-900">TicketFlow</span>
        </RouterLink>

        <nav class="flex items-center gap-4">
          <template v-if="variant === 'landing' && !authStore.isAuthenticated">
            <VButton variant="ghost" @click="router.push('/login')">
              Login
            </VButton>
            <VButton @click="router.push('/signup')">
              Get Started
            </VButton>
          </template>

          <div v-if="authStore.isAuthenticated" class="relative">
            <button
              @click="showDropdown = !showDropdown"
              class="relative h-10 w-10 rounded-full hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <VAvatar :fallback="userInitials" />
            </button>

            <Transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="showDropdown"
                v-click-outside="closeDropdown"
                class="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
              >
                <div class="px-4 py-3">
                  <p class="text-sm">{{ authStore.user?.name }}</p>
                  <p class="text-sm text-gray-500 truncate">{{ authStore.user?.email }}</p>
                </div>

                <div class="py-1">
                  <button
                    @click="navigateAndClose('/dashboard')"
                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <User :size="16" class="mr-2" />
                    Dashboard
                  </button>
                  <button
                    @click="navigateAndClose('/tickets')"
                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Ticket :size="16" class="mr-2" />
                    Manage Tickets
                  </button>
                </div>

                <div class="py-1">
                  <button
                    @click="handleLogout"
                    class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut :size="16" class="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Click outside directive will be added in the app */
</style>
