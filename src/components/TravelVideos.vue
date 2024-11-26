<template>
  <div class="travel-view">
    <div class="travel-container">
      <div class="travel-item">
        <img :src="TravelImage" class="travel-image" />
        <div class="travel-info">
          <div class="travel-info-top">
            <div class="travel-area">{{ travel.area }}</div>
            <div class="travel-title">{{ travel.title }}</div>
          </div>
          <div class="travel-period">
            {{ removeTimeFromDate(travel.startDateTime) }} ~ {{ removeTimeFromDate(travel.endDateTime) }}
          </div>
        </div>
      </div>

      <div ref="mapContainer" style="width: 100%; height: 40vh; border: 1px solid #f0f0f0"></div>

      <div class="travelog">
        <div>총 {{ videos.length }}개의 동영상</div>
        <font-awesome-icon class="travel-icon" size="lg" :icon="['fas', 'circle-play']" />
      </div>

      <div class="video-list">
        <div
          v-for="video in videos"
          class="video-item"
          :key="video.id"
          @click="handleVideoClick(video.id)"
        >
          <img class="video-img" :src="TravelImage" />
          <div class="video-info">
            <div>{{ video.title }}</div>
            <div class="video-date">{{ video.timestamp }}</div>
          </div>
          <div class="travel-icon-container">
            <font-awesome-icon class="travel-icon delete-icon" :icon="['fas', 'trash']" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TravelImage from '@/assets/images/Suwon.jpg'
import { ref, onMounted } from 'vue'
import { getVideosByTravel } from '@/api/video'
import { useRoute, useRouter } from 'vue-router'
import { getTravel } from '@/api/travel';
import { removeTimeFromDate } from '@/utils/pretty-datetime';

const { VITE_KAKAO_MAP_KEY } = import.meta.env
const route = useRoute()
const router = useRouter()

const props = defineProps({
  travelId: Number
})


const handleVideoClick = (id) => {
  // router.push({ name: 'playback', query: { id } })
  alert("WIP")
}

const travel = ref({
  id: props.travelId,
  title: '',
  area: '',
  imgUrl: '',
  startDateTime: '',
  endDateTime: '',
})

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

const mapContainer = ref(null)

let mapInstance = null // 지도 인스턴스 저장
let markers = [] // 마커들을 저장할 배열
let polyline = null

const loadKakaoMap = (container, lat = 37.501311, lng = 127.039604) => {
  const script = document.createElement('script')
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${VITE_KAKAO_MAP_KEY}&libraries=services&autoload=false`
  document.head.appendChild(script)

  script.onload = () => {
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
      }

      mapInstance = new window.kakao.maps.Map(container, options)

      addAllMarkers()
      setMapBounds()
      drawPolyline()
    })
  }
}

const addMarker = (place) => {
  const position = new window.kakao.maps.LatLng(place.y, place.x)

  const marker = new window.kakao.maps.Marker({
    position: position,
  })

  marker.setMap(mapInstance)
  markers.push(marker)

  // 지도의 중심을 마커 위치로 이동
  mapInstance.setCenter(position)
}

const addAllMarkers = () => {
  if (!mapInstance) return

  videos.value.forEach((video) => {
    const place = { y: video.lat, x: video.lng }
    addMarker(place)
  })
}

const setMapBounds = () => {
  if (!mapInstance || markers.length === 0) return

  const bounds = new window.kakao.maps.LatLngBounds()

  markers.forEach((marker) => {
    bounds.extend(marker.getPosition())
  })

  mapInstance.setBounds(bounds)
}

const drawPolyline = () => {
  if (!mapInstance || markers.length === 0) return

  const path = markers.map((marker) => marker.getPosition())

  polyline = new window.kakao.maps.Polyline({
    path: path,
    strokeWeight: 2,
    strokeColor: '#248CFA',
    strokeOpacity: 0.7,
    strokeStyle: 'solid',
  })

  polyline.setMap(mapInstance)
}

onMounted(async () => {
  loadKakaoMap(mapContainer.value)
  travel.value = (await getTravel(props.travelId)).data.travel
  console.log(travel.value)
  await getVideosByTravel(
    props.travelId,
    (response) => {
      videos.value = response.data.videos
      console.log(videos.value)
    },
    (err) => {
      console.log('해당 여행의 비디오들을 불러오는 데 실패했습니다. err: ' + err)
    },
  )
})
</script>

<style scoped>
.travel-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.travel-container {
  width: 90%;
}

.travel-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 1rem;
}

.travel-item {
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0rem;
}

.travel-info {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.4rem 1rem;
}

.travel-info-top {
  display: flex;
  justify-content: center;
  align-items: center;
}

.travel-area {
  background-color: black;
  color: white;
  border-radius: 1rem;
  padding: 0.2rem 0.6rem;
  margin-right: 0.4rem;
  font-size: 0.8rem;
  font-family: 'Nanum Gothic Regular';
}

.travel-period {
  font-size: 0.8rem;
  font-family: 'Nanum Gothic Regular';
}

.travelog {
  display: flex;
  height: 3rem;
  justify-content: space-between;
  align-items: center;
  padding-right: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
}

.video-list {
  height: calc(60vh - 8rem);
  overflow-y: auto;
  padding-bottom: 8rem;
}

.video-list::-webkit-scrollbar {
  display: none;
}

.video-item {
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}

.video-img {
  height: 70px;
  width: 110px;
  object-fit: cover;
}

.video-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  padding: 0.4rem 1rem;
}

.video-date {
  font-size: 0.8rem;
  font-family: 'Nanum Gothic Regular';
}

.travel-icon-container {
  display: flex;
  align-items: flex-end;
  padding: 0.4rem 1rem;
}

.travel-icon {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.travel-icon:hover {
  transform: scale(1.2);
}

.travel-icon:active {
  transform: scale(0.9);
}

.delete-icon {
  color: red;
}
</style>
