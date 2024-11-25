<template>
  <!-- 해당 유저의 동영상 -->
  <div class="video-container">
    <div v-for="video in videos" :key="video.title" class="video-card">
      {{ video.title }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// const props = defineProps({
//   videos: {
//     type: Array,
//   },
// })

// const videos = ref(props.videos)

const videos = ref([
  { title: '영상 1' },
  { title: '영상 2' },
  { title: '영상 3' },
  { title: '영상 4' },
  { title: '영상 5' },
  { title: '영상 6' },
  { title: '영상 7' },
  { title: '영상 8' },
  { title: '영상 9' },
])
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
