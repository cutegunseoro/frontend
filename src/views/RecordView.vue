<template>
  <div class="video-container">
    <video ref="videoElement" class="video-element"></video>
    <CameraFooter @toggleCamera="toggleCamera" />
  </div>
</template>

<script setup>
import CameraFooter from '@/components/CameraFooter.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const videoElement = ref(null)
const devices = ref([])
const selectedDeviceId = ref('')

onMounted(async () => {
  await listDevices()
  await startCamera()
})

onBeforeUnmount(() => {
  stopCurrentStream()
})

const startCamera = async () => {
  try {
    // 기존 스트림 종료
    stopCurrentStream()

    // 새로운 스트림 시작
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: selectedDeviceId.value ? { exact: selectedDeviceId.value } : undefined },
    })

    if (videoElement.value) {
      videoElement.value.srcObject = stream
      videoElement.value.play()
    }
  } catch (err) {
    console.log('Error starting camera:', err)
  }
}

const toggleCamera = async () => {
  // 사용 가능한 카메라가 없는 경우
  if (devices.value.length === 0) return

  const currentDevice = devices.value.find((device) => device.deviceId === selectedDeviceId.value)

  // 현재 카메라가 전면 카메라인 경우 후면 카메라로, 아니면 전면 카메라로 변경
  const nextDevice = devices.value.find((device) => {
    const isFrontCamera = currentDevice.facingMode === 'user'
    return isFrontCamera ? device.facingMode === 'environment' : device.facingMode === 'user'
  })

  if (nextDevice) {
    selectedDeviceId.value = nextDevice.deviceId
    await startCamera()
  }
}

// 사용 가능한 카메라 리스트 업
const listDevices = async () => {
  try {
    const allDevices = await navigator.mediaDevices.enumerateDevices()
    devices.value = allDevices.filter((device) => device.kind === 'videoinput')

    if (devices.value.length > 0) {
      // 기본 카메라 선택
      selectedDeviceId.value = devices.value[0].deviceId
    }
  } catch (err) {
    console.log('Error listing devices:', err)
  }
}

const stopCurrentStream = () => {
  const currentStream = videoElement.value?.srcObject
  if (currentStream) {
    const tracks = currentStream.getTracks()
    tracks.forEach((track) => track.stop())
  }
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
</style>
