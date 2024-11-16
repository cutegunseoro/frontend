<template>
  <div ref="mapContainer" style="width: 100%; height: 90vh"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const { VITE_KAKAO_MAP_KEY } = import.meta.env

const mapContainer = ref(null)

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
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${VITE_KAKAO_MAP_KEY}&autoload=false`
  document.head.appendChild(script)

  script.onload = () => {
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
      }

      const mapInstance = new window.kakao.maps.Map(container, options)

      const markerPosition = new window.kakao.maps.LatLng(lat, lng)

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      })

      marker.setMap(mapInstance)
    })
  }
}
</script>
<style scoped></style>
