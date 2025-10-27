<script setup lang="ts">
import { Ticket } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-gray-50 border-t mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Ticket :size="20" class="text-white" />
            </div>
            <span class="font-semibold text-foreground">TicketFlow</span>
          </div>
          <p class="text-muted max-w-md">
            Streamline your support workflow with our modern ticket management system. Track, organize, and resolve tickets efficiently.
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-foreground mb-4">Product</h3>
          <ul class="space-y-2">
            <li>
              <RouterLink to="/" class="text-muted hover:text-indigo-600 transition-colors">
                Features
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/" class="text-gray-600 hover:text-indigo-600 transition-colors">
                Pricing
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/" class="text-gray-600 hover:text-indigo-600 transition-colors">
                Security
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold text-foreground mb-4">Company</h3>
          <ul class="space-y-2">
            <li>
              <RouterLink to="/" class="text-muted hover:text-indigo-600 transition-colors">
                About
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/" class="text-gray-600 hover:text-indigo-600 transition-colors">
                Blog
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/" class="text-gray-600 hover:text-indigo-600 transition-colors">
                Contact
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t mt-8 pt-8 text-center text-muted">
        <p>&copy; {{ currentYear }} TicketFlow. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
