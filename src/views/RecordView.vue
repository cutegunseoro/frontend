<template>
  <div class="video-container">
    <video ref="videoElement" class="video-element" autoplay muted playsinline></video>
    <div style="color: red; z-index: 100">{{ debugMsg }}</div>
    <CameraFooter
      :isRecording="isRecording"
      @toggle-camera="toggleCamera"
      @toggle-recording="toggleRecording"
    />
  </div>
</template>

<script setup>
import CameraFooter from '@/components/CameraFooter.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const videoElement = ref(null)
const devices = ref([]) // 사용 가능한 카메라
const selectedDeviceId = ref('') // 현재 사용 중인 카메라 ID

const mediaStream = ref(null)
const mediaRecorder = ref(null)

const recordedChunks = ref([]) // 녹화된 동영상 조각
const videoUrl = ref(null) //녹화 완료된 영상 URL
const isRecording = ref(false) // 현재 녹화 중 여부

const debugMsg = ref('디버깅용')

onMounted(async () => {
  await listDevices()
  await setupCamera()
})

onBeforeUnmount(() => {
  stopCurrentStream()
})

const setupCamera = async () => {
  try {
    // 기존 스트림 종료
    stopCurrentStream()

    // 새로운 스트림 시작
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: selectedDeviceId.value ? { exact: selectedDeviceId.value } : undefined },
      audio: true,
    })

    mediaStream.value = stream
    videoElement.value.srcObject = stream
  } catch (err) {
    console.log('Error starting camera:', err)
  }
}

const toggleRecording = () => {
  if (isRecording.value) {
    stopRecording()
    return
  }

  startRecording()
}

const startRecording = () => {
  mediaRecorder.value = new MediaRecorder(mediaStream.value)

  mediaRecorder.value.ondataavailable = (event) => {
    recordedChunks.value.push(event.data)
  }

  mediaRecorder.value.start()
  isRecording.value = true
  console.log('녹화 시작')
}

const stopRecording = () => {
  mediaRecorder.value.stop()
  isRecording.value = false

  mediaRecorder.value.onstop = () => {
    const blob = new Blob(recordedChunks.value, { type: 'video/webm' })
    videoUrl.value = URL.createObjectURL(blob)
    recordedChunks.value = []

    // 녹화가 완료되면 비디오 다시 재생
    router.push({ name: 'playback', query: { videoUrl: videoUrl.value } })
  }

  console.log('녹화 끝')
}

const toggleCamera = async () => {
  // 다른 카메라가 없는 경우
  if (devices.value.length < 2) return

  const currentDevice = devices.value.find((device) => device.deviceId === selectedDeviceId.value)

  // 전 / 후면 카메라 전환
  const nextDevice = devices.value.find((device) => {
    const isFrontCamera = currentDevice.facingMode === 'user'
    return isFrontCamera ? device.facingMode === 'environment' : device.facingMode === 'user'
  })

  if (nextDevice) {
    selectedDeviceId.value = nextDevice.deviceId
    await setupCamera()
  }
}

// 사용 가능한 카메라 리스트 업
const listDevices = async () => {
  try {
    // 카메라 권한을 먼저 요청
    await navigator.mediaDevices.getUserMedia({ video: true })

    const allDevices = await navigator.mediaDevices.enumerateDevices()
    devices.value = allDevices.filter((device) => device.kind === 'videoinput')

    if (devices.value.length > 0) {
      // 기본 카메라 선택
      selectedDeviceId.value = devices.value[0].deviceId
    }

    // 디버그 메시지에 사용 가능한 카메라 정보 표시
    debugMsg.value = devices.value
      .map((device, index) => `${index + 1}: ${device.label || 'Unknown Camera'}`)
      .join('\n')
  } catch (err) {
    console.log('Error listing devices:', err)
  }
}

const stopCurrentStream = () => {
  if (mediaStream.value) {
    const tracks = mediaStream.value.getTracks()
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
