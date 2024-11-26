<template>
  <div class="video-container">
    <div v-for="video in videos" :key="video.title" class="video-card" @click="handleVideoClick(video.id)">
      {{ video.title }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  videos: {
    type: Array,
  },
})

const videos = ref(props.videos)

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

.video-card {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  aspect-ratio: 9 / 16; /* 세로 동영상 비율 */
  width: 100%;
  background-color: colors.$primary-color;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.video-card:hover {
  background-color: colors.$secondary-color;
}
</style>
