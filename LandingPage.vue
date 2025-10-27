<script setup lang="ts">
import { useRouter } from 'vue-router'
import VButton from '../components/ui/VButton.vue'
import VCard from '../components/ui/VCard.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import WaveBackground from '../components/WaveBackground.vue'
import DecorativeCircles from '../components/DecorativeCircles.vue'
import ImageWithFallback from '../components/figma/ImageWithFallback.vue'
import { CheckCircle2, Clock, BarChart3 } from 'lucide-vue-next'

const router = useRouter()

const features = [
  {
    title: 'Real-time Tracking',
    description: 'Monitor ticket status and progress in real-time with instant updates.',
    icon: Clock,
    image: 'https://images.unsplash.com/photo-1748256622734-92241ae7b43f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjEyNTA4NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: 'Easy Organization',
    description: 'Organize tickets by status, priority, and category for better workflow.',
    icon: BarChart3,
    image: 'https://images.unsplash.com/photo-1700561306724-b3723282ce5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbWFuYWdlbWVudCUyMG9yZ2FuaXplfGVufDF8fHx8MTc2MTI5ODk0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: 'Quick Resolution',
    description: 'Streamline your support process and resolve issues faster than ever.',
    icon: CheckCircle2,
    image: 'https://images.unsplash.com/photo-1758519290233-a03c1d17ecc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwb3J0JTIwY3VzdG9tZXIlMjBzZXJ2aWNlfGVufDF8fHx8MTc2MTI5ODk0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
]
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header variant="landing" />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
      <DecorativeCircles />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-gray-900 mb-6">
            Manage Your Tickets with Ease
          </h1>
          <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
            A modern, intuitive ticket management system that helps teams track, organize,
            and resolve support tickets efficiently. Streamline your workflow today.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <VButton size="lg" @click="router.push('/signup')">
              Get Started Free
            </VButton>
            <VButton size="lg" variant="outline" @click="router.push('/login')">
              Login
            </VButton>
          </div>
        </div>
      </div>

      <WaveBackground />
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Powerful features to help you manage your support tickets effectively
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <VCard
            v-for="(feature, index) in features"
            :key="index"
            class-name="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div class="aspect-video w-full overflow-hidden bg-gray-100">
              <ImageWithFallback
                :src="feature.image"
                :alt="feature.title"
                class-name="w-full h-full object-cover"
              />
            </div>
            <div class="p-6">
              <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <component :is="feature.icon" :size="24" class="text-indigo-600" />
              </div>
              <h3 class="text-gray-900 mb-2">{{ feature.title }}</h3>
              <p class="text-gray-600">{{ feature.description }}</p>
            </div>
          </VCard>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-br from-indigo-600 to-purple-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-white mb-4">
          Ready to Get Started?
        </h2>
        <p class="text-indigo-100 mb-8 max-w-2xl mx-auto">
          Join thousands of teams who trust TicketFlow for their support management
        </p>
        <VButton size="lg" variant="secondary" @click="router.push('/signup')">
          Create Free Account
        </VButton>
      </div>
    </section>

    <Footer />
  </div>
</template>
