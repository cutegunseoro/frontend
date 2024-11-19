<template>
  <div class="home-view">
    <div ref="mapContainer" style="width: 100%; height: 40vh; position: relative;"></div>

    <div class="search-container">
      <div class="search-input-container">
        <input v-model.trim="keyword" @keydown.enter="handleSearchIconClick" />
        <font-awesome-icon class="search-icon" size="lg" :icon="['fas', 'magnifying-glass']" @click="handleSearchIconClick" />
      </div>
      <div class="search-result-container">
        <div class="search-result-list">
          <div class="search-result-item" v-for="place in searchedPlaces" :key="place.id">{{ place.place_name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const { VITE_KAKAO_MAP_KEY } = import.meta.env

const keyword = ref('')
const searchedPlaces = ref([])
const mapContainer = ref(null)

let mapInstance = null // 지도 인스턴스 저장
let markers = [] // 마커들을 저장할 배열

const handleSearchIconClick = () => {
  if (keyword.value) {
    searchPlaces(keyword.value)
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
      }
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

// 기존에 있던 마커들 제거
const removeMarkers = () => {
  markers.forEach(marker => marker.setMap(null))
  markers = []
}

// 장소 검색 함수
const searchPlaces = (keyword) => {
  if (!mapInstance) return

  const ps = new window.kakao.maps.services.Places()

  // 기존에 있던 마커들 제거
  removeMarkers()

  ps.keywordSearch(keyword, (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const bounds = new window.kakao.maps.LatLngBounds()
      searchedPlaces.value = []

      // 검색된 장소들에 대해 마커 추가
      data.forEach((place) => {
        const position = new window.kakao.maps.LatLng(place.y, place.x)

        const marker = new window.kakao.maps.Marker({
          position: position,
        })

        marker.setMap(mapInstance)
        markers.push(marker)

        bounds.extend(position)

        searchedPlaces.value.push(place)

        // 검색된 장소의 이름을 콘솔에 출력
        console.log(place)
      })

      mapInstance.setBounds(bounds)
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
  width: 100%;
}

.search-container {
  width: 100%;
}

.search-input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 100%;
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

}

.search-result-list {
  overflow-y: auto;
}

.search-result-item {
  // height: 3rem;
}
</style>
