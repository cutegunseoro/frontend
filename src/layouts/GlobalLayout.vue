<template>
  <div :class="isMobile ? '' : 'layout-container'">
    <AppHeader v-if="!(isIntroView || isRecordView || isAuthView || isHomeView)" />
    <slot></slot>
    <AppFooter v-if="!(isIntroView || isRecordView || isAuthView)" />
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMobile = ref(false)

const isRecordView = computed(() => ['/record', '/playback'].includes(route.path))
const isIntroView = computed(() => route.path === '/')
const isHomeView = computed(() => route.path === '/home')
const isAuthView = computed(() => ['/login', '/regist'].includes(route.path))

const handleResize = () => {
  isMobile.value = window.innerWidth <= 480
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 1px solid #f0f0f0;
  border-right: 1px solid #f0f0f0;
  box-sizing: content-box;
  overflow: hidden;
}
</style>
