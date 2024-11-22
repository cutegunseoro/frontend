<template>
  <div class="add-view">
    <div class="search-container">
      <div class="search-input-container">
        <input :value="keyword" @input="handleInputChange" placeholder="어디로 여행을 떠나시나요?"/>
        <ScrollArea v-show="keyword" className="rounded-lg p-4 scroll-area">
          <div class="search-result-container">
            <div class="search-result-list">
              <div
                class="search-result-item"
                v-for="place in searchedPlaces"
                :key="place.id"
                @click="handlePlaceClick(place)"
              >
                <div>{{ place.place_name }}</div>
                <div>{{ place.road_address_name }}</div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
      <font-awesome-icon
        class="search-icon"
        size="lg"
        :icon="['fas', 'magnifying-glass']"
      />
    </div>
    <div v-show="markers.length > 0" class="next-btn" @click="handleNextIconClick">
      <font-awesome-icon :icon="['fas', 'arrow-right']" />
    </div>
    <div ref="mapContainer" style="width: 100%; height: 100vh"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ScrollArea } from "@/components/ui/scroll-area"

const { VITE_KAKAO_MAP_KEY } = import.meta.env
const router = useRouter()

const keyword = ref('')
const searchedPlaces = ref([])
const mapContainer = ref(null)

let mapInstance = null // 지도 인스턴스 저장
let markers = [] // 마커들을 저장할 배열

const handleInputChange = (event) => {
  keyword.value = event.target.value
  showSearchedPlaces()
}

const showSearchedPlaces = () => {
  if (keyword.value) {
    searchPlaces(keyword.value)
  }
}

const handlePlaceClick = (place) => {
  addMarker(place)

  keyword.value = ''
}

const handleNextIconClick = () => {
  router.push('/plan/period')
}

const loadKakaoMap = (container, lat = 36.5, lng = 127.8) => {
  const script = document.createElement('script')
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${VITE_KAKAO_MAP_KEY}&libraries=services&autoload=false`
  document.head.appendChild(script)

  script.onload = () => {
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 13,
      }

      mapInstance = new window.kakao.maps.Map(container, options)
    })
  }
}

const addMarker = (place) => {
  removeMarkers()

  const position = new window.kakao.maps.LatLng(place.y, place.x)

  const marker = new window.kakao.maps.Marker({
    position: position,
  })

  marker.setMap(mapInstance)
  markers.push(marker)
}

// 기존에 있던 마커들 제거
const removeMarkers = () => {
  markers.forEach((marker) => marker.setMap(null))
  markers = []
}

// 장소 검색 함수
const searchPlaces = (keyword) => {
  if (!mapInstance) return

  const ps = new window.kakao.maps.services.Places()

  ps.keywordSearch(keyword, (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      searchedPlaces.value = []

      data.forEach((place) => {
        searchedPlaces.value.push(place)

        // 검색된 장소의 이름을 콘솔에 출력
        console.log(place)
      })
    } else {
      console.error('장소 검색에 실패했습니다.')
    }
  })
}

// 컴포넌트가 마운트되면 사용자 위치에 맵 로딩
onMounted(async () => {
  loadKakaoMap(mapContainer.value)
  console.log(ScrollArea)
})
</script>
<style scoped lang="scss">
.add-view {
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
}

.search-container {
  display: flex;
  position: absolute;
  top: 2rem;
  width: 80%;
  z-index: 100;
}

.search-input-container {
  width: 100%;
  margin: 0rem 1rem;
}

input {
  width: 100%;
  height: 2rem;
  border-radius: 1rem;
  padding: 0rem 1rem;
}

input:focus {
  outline: none;
}

.search-icon {
  padding: 0.5rem 0rem;
  color: colors.$highlight-color;
}

.scroll-area {
  height: 14rem;
  background-color: rgba(255, 255, 255, 0.5);
}

.search-result-container::-webkit-scrollbar {
  display: none;
}

.search-result-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 4rem;
  padding: 0rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
}

.next-btn {
  position: absolute;
  bottom: 5rem;
  right: 1rem;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 3rem;
  background-color: colors.$secondary-color;
  color: colors.$primary-color;
  border-radius: 50%;
  // font-size: 0.8rem;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.next-btn:hover {
  transform: scale(1.1);
}

.next-btn:active {
  transform: scale(0.9);
}
</style>
