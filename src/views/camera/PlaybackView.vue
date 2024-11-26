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
        v-if="videoUrl"
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
import { getVideo, getVideoUploadUrl, uploadVideoMetadata } from '@/api/video'
import { useTravelStore } from '@/stores/travel'

const travelStore = useTravelStore()
const travelId = travelStore.curTravelInfo.travelId

const router = useRouter()
const route = useRoute()

const videoElement = ref(null)
const videoUrl = ref(null)
const videoId = ref(null)

const isPlaying = ref(false)
const showModal = ref(false)

const handleModalVisibility = (newVisibility) => {
  showModal.value = newVisibility
}

// 기존 영상 재생 시 사용
const fetchVideo = async () => {
  await getVideo(videoId, (response) => {
    if (response.status === 200) {
      videoUrl.value = response.data.videoUrl
    }
  }, (err) => {
    console.log("동영상을 불러오는 데 실패하였습니다. err: " + err)
  })
}

const playVideo = () => {
  if (videoElement.value) {
    videoElement.value.play()
    isPlaying.value = true
  }
}

const uploadVideoFile = async () => {
  // console.log(videoUrl.value)
  // console.log('jwt: ', sessionStorage.getItem('jwt'))

  try {
    // 0. 비디오 업로드 url 받아오기
    const getUrlRes = await getVideoUploadUrl(encodeURIComponent('video/webm'))
    const {objectKey, preSignedUrl} = getUrlRes.data

    // 1. 비디오 Blob 생성
    const videoBlob = await fetch(videoUrl.value).then((response) => response.blob())

    // 2. Blob을 File 객체로 변환
    const file = new File([videoBlob], 'video.webm', { type: 'video/webm' })

    // 3. 비디오 업로드
    const uploadVideoRes = await axios.put(preSignedUrl, file, {
      headers: {
        "Content-Type": "application/octet-stream",
      },
      // onUploadProgress: (progressEvent) => {progressEvent.loaded} -> 업로드 상황 업데이트 가능
    })

    // 4. 비디오 메타데이터 생성 & 업로드
    const { lat, lng } = await getUserCoord()

    const uploadVideoMetadataRes = await uploadVideoMetadata({
      coordinates: `POINT(${lat} ${lng})`,
      videoS3Key: objectKey,
      videoContentType: "video/webm"
    })

    if (uploadVideoMetadataRes.status === 200) {
      router.push('/history')
    }

  } catch (err) {
    console.error('업로드 중 오류 발생:', err)
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

onMounted(async () => {
  if (route.query.videoUrl) {
    videoUrl.value = route.query.videoUrl
  } else if (route.query.id) {
    videoId.value = route.query.videoId
    await fetchVideo()
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
