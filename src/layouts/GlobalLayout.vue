<template>
  <div :class="isMobile ? '' : 'layout-container'">
    <AppHeader v-if="isHistoryView || isProfileView || isPlanView" />
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

const isIntroView = computed(() => route.path === '/')
const isPlanView = computed(() => ['/plan', '/plan/period'].includes(route.path))
const isAuthView = computed(() => ['/login', '/regist'].includes(route.path))
const isRecordView = computed(() => ['/record', '/playback'].includes(route.path))
const isHistoryView = computed(() => ['history', 'historyDetail'].includes(route.name))
const isProfileView = computed(() => route.path === '/profile')

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

<style scoped lang="scss">
.layout-container {
  min-height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 1px solid #f0f0f0;
  border-right: 1px solid #f0f0f0;
  box-sizing: content-box;
}
</style>
