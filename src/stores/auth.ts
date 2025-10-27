import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  id: string
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)

  const login = async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 500))

    if (!email || !password) {
      return { success: false, error: 'Please fill in all fields' }
    }

    if (password.length < 6) {
      return { success: false, error: 'Invalid credentials' }
    }

    const u: User = {
      id: '1',
      name: email.split('@')[0],
      email,
    }

    user.value = u
    isAuthenticated.value = true

    return { success: true }
  }

  const signup = async (name: string, email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 500))

    if (!name || !email || !password) {
      return { success: false, error: 'Please fill in all fields' }
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' }
    }

    if (!email.includes('@')) {
      return { success: false, error: 'Please enter a valid email' }
    }

    const u: User = {
      id: '1',
      name,
      email,
    }

    user.value = u
    isAuthenticated.value = true

    return { success: true }
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
  }

  return { user, isAuthenticated, login, signup, logout }
})
