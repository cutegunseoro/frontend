<template>
  <div class="home-view">
    <div class="map-header">
      <div v-show="selectedPlace" class="address">{{ selectedPlace }}</div>
      <div class="gps-icon-wrapper" @click="handleGPSIconClick">
        <font-awesome-icon class="gps-icon" size="lg" :icon="['fas', 'location-arrow']" />
      </div>
    </div>

    <div ref="mapContainer" style="width: 100%; height: 100vh"></div>

    <div class="search-container" :class="{ open: isHidden }">
      <div class="search-input-container" ref="searchInputContainer" @mousedown="startDrag">
        <input
          :value="keyword"
          @input="handleInputChange"
          @keydown.enter="handleSearchIconClick"
          placeholder="원하는 여행지를 검색하고 주변 영상을 감상하세요!"
        />
        <font-awesome-icon
          @click="handleSearchIconClick"
          class="search-icon"
          size="lg"
          :icon="['fas', 'magnifying-glass']"
        />
      </div>
      <div class="search-result-container">
        <div v-show="isSearchOpen" class="search-result-list">
          <div
            class="search-result-item"
            v-for="place in searchedPlaces"
            :key="place.id"
            @click="handleSearchedPlaceClick(place)"
          >
            <div>{{ place.place_name }}</div>
            <div class="item-address">{{ place.road_address_name }}</div>
          </div>
        </div>
        <VideoBox v-show="!isSearchOpen" />
      </div>
    </div>
  </div>
</template>
<script setup>
import VideoBox from '@/components/VideoBox.vue'
import { ref, onMounted } from 'vue'

const { VITE_KAKAO_MAP_KEY } = import.meta.env

const keyword = ref('')
const searchedPlaces = ref([])
const selectedPlace = ref(null)
const mapContainer = ref(null)

let mapInstance = null // 지도 인스턴스 저장
let markers = [] // 마커들을 저장할 배열
let geocoder = null

const isSearchOpen = ref(false)
const isHidden = ref(false)

let startY = 0
let startTop = 0

const startDrag = (e) => {
  startY = e.clientY
  startTop = e.target.getBoundingClientRect().top

  const onMouseMove = (moveEvent) => {
    const deltaY = moveEvent.clientY - startY
    const currentTop = startTop + deltaY

    if (currentTop > startTop + 20) {
      isHidden.value = true
    } else if (currentTop < startTop - 20) {
      isHidden.value = false
    }
  }

  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

const handleGPSIconClick = async () => {
  try {
    const { lat, lng } = await getUserCoord()
    loadKakaoMap(mapContainer.value, lat, lng)
    isSearchOpen.value = false
    isHidden.value = false
  } catch (err) {
    console.error('위치 정보를 가져오는 데 실패했습니다. error: ', err)
    loadKakaoMap(mapContainer.value)
  }
}

const handleInputChange = (event) => {
  keyword.value = event.target.value
  searchPlaces(keyword.value)
  isSearchOpen.value = true
}

const handleSearchIconClick = () => {
  if (searchedPlaces.value.length == 0) return
  handleSearchedPlaceClick(searchedPlaces.value[0])
}

const handleSearchedPlaceClick = (place) => {
  isSearchOpen.value = false
  addMarker(place)
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
      geocoder = new window.kakao.maps.services.Geocoder()

      const place = { y: lat, x: lng }

      getAddressFromCoords(lat, lng).then((address) => {
        place.address_name = address
        addMarker(place)
      })
    })
  }
}

// 위도, 경도를 통해 주소를 가져오는 함수
const getAddressFromCoords = (lat, lng) => {
  return new Promise((resolve, reject) => {
    const coord = new window.kakao.maps.LatLng(lat, lng)

    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        resolve(result[0].address.address_name)
      } else {
        reject('주소 변환에 실패했습니다.')
      }
    })
  })
}

const addMarker = (place) => {
  removeMarkers()

  const position = new window.kakao.maps.LatLng(place.y, place.x)

  const marker = new window.kakao.maps.Marker({
    position: position,
  })

  marker.setMap(mapInstance)
  markers.push(marker)

  // 지도의 중심을 마커 위치로 이동
  const adjustedPosition = new window.kakao.maps.LatLng(place.y - 0.0015, place.x)
  mapInstance.setCenter(adjustedPosition)
  selectedPlace.value = place.address_name
  console.log(place)
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
      })
    } else {
      console.error('장소 검색에 실패했습니다.')
    }
  })
}

// 컴포넌트가 마운트되면 사용자 위치에 맵 로딩
onMounted(async () => {
  if (!navigator.geolocation) {
    alert('위치 수집을 지원하지 않는 브라우저입니다.')
    loadKakaoMap(mapContainer.value)
    return
  }

  try {
    const { lat, lng } = await getUserCoord()
    loadKakaoMap(mapContainer.value, lat, lng)
  } catch (err) {
    console.error('위치 정보를 가져오는 데 실패했습니다. error: ', err)
    loadKakaoMap(mapContainer.value)
  }
})
</script>
<style scoped lang="scss">
.home-view {
  position: relative;
  width: 100%;
}

.map-header {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  top: 1rem;
  z-index: 2;
}

.address {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  background-color: colors.$primary-color;
  border-radius: 1rem;
  padding: 0rem 1rem;
}

.gps-icon-wrapper {
  position: absolute;
  top: 0;
  right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 2rem;
  background-color: colors.$primary-color;
  border-radius: 50%;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.gps-icon-wrapper:hover {
  transform: scale(1.1);
}

.gps-icon-wrapper:active {
  transform: scale(0.9);
}

.gps-icon {
  color: colors.$highlight-color;
}

.search-container {
  position: absolute;
  top: 50vh;
  z-index: 1;
  width: 100%;
  transition: transform 0.6s ease-in-out;

  &.open {
    transform: translateY(calc(50vh - 7rem));
  }
}

.search-input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  background-color: colors.$primary-color;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  cursor: pointer;
}

input {
  width: 70%;
  height: 2rem;
  border-radius: 1rem;
  padding: 0rem 1rem;
  margin: 0rem 1rem;
}

input:focus {
  outline: none;
  border: 0.1rem solid colors.$highlight-color;
}

.search-icon {
  color: colors.$highlight-color;
  cursor: pointer;
}

.search-result-container {
  width: 100%;
  background-color: #f5e8ff;
  display: flex;
  flex-direction: column;
  height: calc(50vh - 7rem);
}

.search-result-list {
  overflow-y: auto;
}

.search-result-list::-webkit-scrollbar {
  display: none;
}

.search-result-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 4rem;
  border-bottom: 1px solid #f0f0f0;
  padding: 0rem 1rem;
  cursor: pointer;
}

.item-address {
  font-size: 0.8rem;
  font-family: 'Nanum Gothic Regular';
}
</style>
