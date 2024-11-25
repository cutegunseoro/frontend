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
        @click="handleModalVisibility(true)"
      />
      <font-awesome-icon
        class="camera-icon delete-icon"
        size="lg"
        :icon="['fas', 'trash']"
        @click="handleDeleteIconClick"
      />
    </div>
    <AlertDialog
      :visible="showModal"
      @update:visible="handleModalVisibility"
      @register="uploadVideoFile"
    >
      <div class="modal-inner">동영상을 저장하시겠습니까?</div>
    </AlertDialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import AlertDialog from '@/components/AlertDialog.vue'
// import { uploadVideo } from '@/api/video'
import { createVideoInfo } from '@/api/video'
import { useTravelStore } from '@/stores/travel'

const travelStore = useTravelStore()
const travelId = travelStore.curTravelInfo.travelId

const router = useRouter()
const route = useRoute()

const videoElement = ref(null)
const videoUrl = ref(null)

const isPlaying = ref(false)
const showModal = ref(false)

const handleModalVisibility = (newVisibility) => {
  showModal.value = newVisibility
}

const uploadVideoMetaInfo = async (videoUrl) => {
  const { lat, lng } = await getUserCoord()

  const metaInfo = {
    travelId,
    coordinates: `POINT(${lat} ${lng})`,
    videoUrl,
  }

  await createVideoInfo(metaInfo, (response) => {
    if (response.status === 200) {
      router.push('/history')
    }
  }, (err) => {
    console.log(err)
  })
}

const uploadVideoFile = async () => {
  console.log(videoUrl.value)
  console.log('jwt: ', sessionStorage.getItem('jwt'))

  try {
    // 1. 비디오 Blob 생성
    const videoBlob = await fetch(videoUrl.value).then((response) => response.blob())

    // 2. Blob을 File 객체로 변환
    const file = new File([videoBlob], 'video.webm', { type: 'video/webm' })

    // 3. FormData에 파일 추가
    const formData = new FormData()
    formData.append('file', file)

    // 4. JWT 가져오기
    const token = sessionStorage.getItem('jwt')

    // 5. Axios를 통해 multipart 요청 전송
    const response = await axios.post('http://localhost:8080/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // 반드시 multipart 설정
        Authorization: token ? `Bearer ${token}` : '', // JWT 토큰 포함
      },
    })

    console.log('응답 데이터:', response.data)
    await uploadVideoMetaInfo(response.data.filePath)

  } catch (err) {
    console.error('업로드 중 오류 발생:', err)
  }
}

const playVideo = () => {
  if (videoElement.value) {
    videoElement.value.play()
    isPlaying.value = true
  }
}

const getUserCoord = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          coords: { latitude, longitude },
        } = position
        resolve({ lat: latitude, lng: longitude })
      },
      (err) => {
        reject(err)
      },
    )
  })
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

.modal-inner {
  padding: 1rem 0rem;
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
