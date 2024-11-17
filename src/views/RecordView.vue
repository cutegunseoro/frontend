<template>
  <div class="video-container">
    <video ref="videoElement" class="video-element"></video>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const videoElement = ref(null)

onMounted(async () => {
  await startCamera()
})

const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })

    if (videoElement.value) {
      videoElement.value.srcObject = stream
      videoElement.value.play()
    }
  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped>
.video-container {
  display: flex;
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
</style>
