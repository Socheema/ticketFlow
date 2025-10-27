import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './styles/globals.css'
import { useTheme } from './composables/useTheme'

const app = createApp(App)
const pinia = createPinia()

// Click outside directive
app.directive('click-outside', {
  mounted(el, binding) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  },
})

app.use(pinia)
app.use(router)

// initialize theme
if (typeof window !== 'undefined') {
  const theme = useTheme()
  theme.init()
}

app.mount('#app')
