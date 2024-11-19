<script setup>
import KakaoMap from '@/components/KakaoMap.vue'
import VideoBox from '@/components/VideoBox.vue'
</script>

<template>
  <div class="home-view">
    <KakaoMap />
    <VideoBox />
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - 4rem);
}
</style>
