<template>
  <!-- 해당 유저의 동영상 -->
  <div class="video-container">
    <div v-for="video in videos" :key="video.title" class="video-card" @click="handleVideoClick(video.videoUrl)">
      {{ video.title }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// const props = defineProps({
//   videos: {
//     type: Array,
//   },
// })

// const videos = ref(props.videos)

const handleVideoClick = (videoUrl) => {
  router.push({ name: 'playback', query: { videoUrl } })
}

const videos = ref([
  {
    id: 1,
    title: '영상 1',
    lat: 37.501311,
    lng: 127.039604,
    videoUrl: '',
    timestamp: '2024-11-26 14:20',
  },
  {
    id: 2,
    title: '영상 2',
    lat: 37.502811,
    lng: 127.041204,
    videoUrl: '',
    timestamp: '2024-11-26 14:30',
  },
  {
    id: 3,
    title: '영상 3',
    lat: 37.503911,
    lng: 127.042904,
    videoUrl: '',
    timestamp: '2024-11-26 14:40',
  },
  {
    id: 4,
    title: '영상 4',
    lat: 37.504711,
    lng: 127.041404,
    videoUrl: '',
    timestamp: '2024-11-26 14:50',
  },
  {
    id: 6,
    title: '영상 6',
    lat: 37.505811,
    lng: 127.044404,
    videoUrl: '',
    timestamp: '2024-11-26 15:10',
  },
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
