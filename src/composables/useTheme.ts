import { ref } from 'vue'

const STORAGE_KEY = 'tf-theme'

// module-level state so every caller shares the same reactive value
const isDark = ref<boolean>(false)

function applyClass(dark: boolean) {
  const el = document.documentElement
  if (dark) el.classList.add('dark')
  else el.classList.remove('dark')
}

function init() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      isDark.value = stored === 'dark'
    } else {
      // prefer system if no choice
      isDark.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  } catch (e) {
    isDark.value = false
  }
  applyClass(isDark.value)
}

function toggle() {
  isDark.value = !isDark.value
  try {
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
  } catch (e) {
    // ignore
  }
  applyClass(isDark.value)
}

export function useTheme() {
  return { isDark, init, toggle }
}
