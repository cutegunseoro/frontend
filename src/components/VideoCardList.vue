<template>
  <div class="video-container">
    <VideoCard v-for="video in videos" :video="video" :key="video.videoId" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import VideoCard from '@/components/VideoCard.vue';

const router = useRouter()

const props = defineProps({
  videos: {
    type: Array,
  },
})

const handleVideoClick = (id) => {
  router.push({ name: 'playback', query: { id } })
}
</script>

<style scoped lang="scss">
.video-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  overflow-y: auto;
  width: 100%;
  background-color: colors.$primary-color;
  /* margin-top: 1rem; */
}

.video-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge용 스크롤 바 숨기기 */
}
</style>
