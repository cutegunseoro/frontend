<script setup>
import { RouterView } from 'vue-router'
import GlobalLayout from '@/layouts/GlobalLayout.vue'
import PopupPlayer from '@/components/PopupPlayer.vue';
</script>

<template>
  <GlobalLayout>
      <RouterView />
      <PopupPlayer />
  </GlobalLayout>
</template>

<style scoped></style>
