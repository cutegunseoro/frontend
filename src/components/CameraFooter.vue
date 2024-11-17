<template>
  <div class="footer">
    <font-awesome-icon @click="goBack" class="camera-icon" size="lg" :icon="['fas', 'xmark']" />
    <font-awesome-icon
      @click="toggleRecording"
      class="camera-icon"
      size="lg"
      :icon="['fas', 'record-vinyl']"
    />
    <font-awesome-icon
      @click="toggleCamera"
      class="camera-icon"
      size="lg"
      :icon="['fas', 'rotate']"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['toggleCamera', 'toggleRecording'])

const goBack = () => {
  router.go(-1)
}

const toggleCamera = () => {
  emit('toggleCamera')
}

const toggleRecording = () => {
  emit('toggleRecording')
}
</script>

<style scoped lang="scss">
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
</style>
