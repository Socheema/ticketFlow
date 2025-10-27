<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden py-12 dark:bg-none dark:bg-card dark:text-foreground">
    <DecorativeCircles />

    <div class="w-full max-w-md px-4 relative z-10">
      <div class="text-center mb-8">
        <router-link to="/" class="inline-flex items-center gap-2 mb-6">
          <div class="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Ticket class="w-7 h-7 text-white" />
          </div>
          <span class="font-semibold text-foreground">TicketFlow</span>
        </router-link>
      </div>

      <VCard class="p-8 shadow-xl">
  <h1 class="text-foreground mb-2 text-center">Create Account</h1>
  <p class="text-muted text-center mb-6">Get started with TicketFlow today</p>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div class="space-y-2">
            <VLabel for="name">Name</VLabel>
            <VInput
              id="name"
              type="text"
              placeholder="John Doe"
              v-model="name"
              :class="nameError ? 'border-red-500' : ''"
              :disabled="isLoading"
            />
            <p v-if="nameError" class="text-red-600">{{ nameError }}</p>
          </div>

          <div class="space-y-2">
            <VLabel for="email">Email</VLabel>
            <VInput
              id="email"
              type="email"
              placeholder="your@email.com"
              v-model="email"
              :class="emailError ? 'border-red-500' : ''"
              :disabled="isLoading"
            />
            <p v-if="emailError" class="text-red-600">{{ emailError }}</p>
          </div>

          <div class="space-y-2">
            <VLabel for="password">Password</VLabel>
            <VInput
              id="password"
              type="password"
              placeholder="••••••••"
              v-model="password"
              :class="passwordError ? 'border-red-500' : ''"
              :disabled="isLoading"
            />
            <p v-if="passwordError" class="text-red-600">{{ passwordError }}</p>
          </div>

          <div class="space-y-2">
            <VLabel for="confirmPassword">Confirm Password</VLabel>
            <VInput
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              v-model="confirmPassword"
              :class="confirmPasswordError ? 'border-red-500' : ''"
              :disabled="isLoading"
            />
            <p v-if="confirmPasswordError" class="text-red-600">{{ confirmPasswordError }}</p>
          </div>

          <VButton type="submit" class="w-full" :disabled="isLoading">
            <template v-if="isLoading">
              <Loader2 class="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </template>
            <template v-else>
              Sign Up
            </template>
          </VButton>
        </form>

        <div class="mt-6 text-center">
          <p class="text-muted">
            Already have an account?
            <router-link to="/login" class="text-indigo-600 hover:text-indigo-700">
              Login
            </router-link>
          </p>
        </div>
      </VCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { toast } from 'sonner'
import DecorativeCircles from '../components/DecorativeCircles.vue'
import VCard from '../components/ui/VCard.vue'
import VButton from '../components/ui/VButton.vue'
import VInput from '../components/ui/VInput.vue'
import VLabel from '../components/ui/VLabel.vue'
import { Ticket, Loader2 } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const nameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const isLoading = ref(false)

const handleSubmit = async () => {
  nameError.value = ''
  emailError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''

  // Client-side validation
  let hasError = false

  if (!name.value) {
    nameError.value = 'Name is required'
    hasError = true
  }

  if (!email.value) {
    emailError.value = 'Email is required'
    hasError = true
  }

  if (!password.value) {
    passwordError.value = 'Password is required'
    hasError = true
  }

  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Passwords do not match'
    hasError = true
  }

  if (hasError) return

  isLoading.value = true
  const result = await authStore.signup(name.value, email.value, password.value)
  isLoading.value = false

  if (result.success) {
    toast.success('Account created successfully!')
    router.push('/dashboard')
  } else {
    if (result.error?.toLowerCase().includes('email')) {
      emailError.value = result.error
    } else if (result.error?.toLowerCase().includes('password')) {
      passwordError.value = result.error
    } else {
      toast.error(result.error || 'Signup failed')
    }
  }
}
</script>
