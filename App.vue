<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
</script>

<template>
  <div id="app">
    <RouterView />
    <Toaster position="top-right" richColors />
  </div>
</template>
