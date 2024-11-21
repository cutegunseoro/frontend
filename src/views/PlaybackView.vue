<template>
  <div class="video-container">
    <video v-if="videoUrl" ref="videoElement" class="video-element" autoplay muted playsinline>
      <source :src="videoUrl" type="video/webm" />
    </video>
    <div class="footer">
      <font-awesome-icon
        class="camera-icon"
        size="lg"
        :icon="['fas', 'rotate-right']"
        @click="playVideo"
      />
      <font-awesome-icon
        class="camera-icon"
        size="lg"
        :icon="['fas', 'paper-plane']"
        @click="shareVideo"
      />
      <font-awesome-icon
        class="camera-icon delete-icon"
        size="lg"
        :icon="['fas', 'trash']"
        @click="handleDeleteIconClick"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const videoElement = ref(null)
const videoUrl = ref(null)

const isPlaying = ref(false)

const shareVideo = () => {
  alert('비디오가 게시되었습니다!')
  router.replace('/profile')
}

const playVideo = () => {
  if (videoElement.value) {
    videoElement.value.play()
    isPlaying.value = true
  }
}

onMounted(() => {
  if (route.query.videoUrl) {
    videoUrl.value = route.query.videoUrl
  } else {
    console.log('No video URL passed')
  }
})

const handleDeleteIconClick = () => {
  router.replace('/record')
}
</script>

<style scoped>
.video-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: black;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.footer {
  display: flex;
  position: fixed;
  max-width: 480px;
  height: 4rem;
  width: 100%;
  bottom: 0;
  justify-content: space-around;
  align-items: center;
  background-color: black;
  color: white;
  z-index: 1;
}

.camera-icon {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.camera-icon:hover {
  transform: scale(1.2);
}

.camera-icon:active {
  transform: scale(0.9);
}

.delete-icon:hover {
  color: red;
}
</style>
