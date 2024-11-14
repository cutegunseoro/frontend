<template>
  <div :class="isMobile ? '' : 'layout-container'">
    <!-- <AppHeader /> -->
    <slot></slot>
    <AppFooter />
  </div>
</template>

<script setup>
// import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import {ref, onMounted, onBeforeUnmount} from 'vue'

const isMobile = ref(false)

const handleResize = () => {
  isMobile.value = window.innerWidth <= 480
};

onMounted(() => {
  handleResize();
    window.addEventListener('resize', handleResize);
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
})

</script>

<style scoped>
.layout-container {
  min-height: 100%;
  max-width: 480px;
  margin: 0 auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 1px solid #f0f0f0;
  border-right: 1px solid #f0f0f0;
}
</style>
