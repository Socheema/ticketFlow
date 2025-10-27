<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toaster from './components/ui/Toaster.vue'
</script>

<template>
  <div id="app">
    <RouterView />
    <!-- local toaster wrapper -->
    <Toaster />
  </div>
</template>
