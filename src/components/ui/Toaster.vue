<script setup lang="ts">
import { Toaster as VueToaster } from 'vue-sonner'
</script>

<template>
  <!-- Local wrapper around vue-sonner Toaster so the project imports a Vue component directly -->
  <VueToaster position="top-right" richColors class="z-[9999]" />
</template>

<style scoped>
/* nothing here — keep the wrapper light-weight */
</style>
