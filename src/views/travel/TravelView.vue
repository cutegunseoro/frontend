<template>
  <div class="travel-view">
    <div class="travel-container">
      <div class="travel-item">
        <img :src="TravelImage" class="travel-image" />
        <div class="travel-info">
          <div class="travel-info-top">
            <div class="travel-area">{{ travelItem.area }}</div>
            <div class="travel-title">{{ travelItem.title }}</div>
          </div>
          <div class="travel-period">
            {{ travelItem.startDatetime }} ~ {{ travelItem.endDatetime }}
          </div>
        </div>
      </div>

      <div ref="mapContainer" style="width: 100%; height: 40vh; border: 1px solid #f0f0f0"></div>

      <div class="video-list">
        <div>비디오!</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TravelImage from '@/assets/images/Suwon.jpg'
const { VITE_KAKAO_MAP_KEY } = import.meta.env
import { ref, onMounted } from 'vue'

const travelItem = ref({
  id: 1,
  title: '행궁 나들이',
  area: '수원',
  imgUrl: '',
  startDatetime: '2024-11-26',
  endDatetime: '2024-11-27',
})

const videos = ref([
  {
    title: '영상 1',
    lat: 0,
    lng: 0,
  },
  { title: '영상 2' },
  { title: '영상 3' },
  { title: '영상 4' },
  { title: '영상 5' },
  { title: '영상 6' },
  { title: '영상 7' },
  { title: '영상 8' },
  { title: '영상 9' },
])

// const searchedPlaces = ref([])
const mapContainer = ref(null)

let mapInstance = null // 지도 인스턴스 저장
let markers = [] // 마커들을 저장할 배열

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

      // 사용자 위치 마커 추가
      const markerPosition = new window.kakao.maps.LatLng(lat, lng)
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      })

      marker.setMap(mapInstance)
      markers.push(marker)
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

// 컴포넌트가 마운트되면 사용자 위치에 맵 로딩
onMounted(async () => {
  loadKakaoMap(mapContainer.value)
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
</style>
