<template>
  <div class="add-view">
    <div class="search-container">
      <div class="search-input-container">
        <input v-model.trim="keyword" @keydown.enter="handleSearchIconClick" />
        <font-awesome-icon
          class="search-icon"
          size="lg"
          :icon="['fas', 'magnifying-glass']"
          @click="handleSearchIconClick"
        />
      </div>
      <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
        Jokester began sneaking into the castle in the middle of the night and leaving
        jokes all over the place: under the king's pillow, in his soup, even in the
        royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
        then, one day, the people of the kingdom discovered that the jokes left by
        Jokester were so funny that they couldn't help but laugh. And once they
        started laughing, they couldn't stop.
      </ScrollArea>
    </div>
    <div ref="mapContainer" style="width: 100%; height: 100vh; position: relative"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ScrollArea } from "@/components/ui/scroll-area"

const { VITE_KAKAO_MAP_KEY } = import.meta.env

const searchedPlaces = ref([])
const mapContainer = ref(null)

let mapInstance = null // 지도 인스턴스 저장
let markers = [] // 마커들을 저장할 배열

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
)

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

  // 지도의 중심을 마커 위치로 이동
  mapInstance.setCenter(position)
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
  width: 100%;
}

.search-container {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
}

.search-input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
}

input {
  width: 80%;
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
  position: absolute;
  width: 100%;
  height: 40vh;
  background-color: white;
}

.search-result-list {
  overflow-y: auto;
  max-height: 40vh;
}

.search-result-item {
  display: flex;
  align-items: center;
  height: 4rem;
  padding: 1rem;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
}
</style>
