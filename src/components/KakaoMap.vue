<template>
  <div ref="mapContainer" style="width: 100%; height: 100vh"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const { VITE_KAKAO_MAP_KEY } = import.meta.env

const mapContainer = ref(null)

onMounted(() => {
  loadKakaoMap(mapContainer.value)
})

const loadKakaoMap = (container) => {
  const script = document.createElement('script')
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${VITE_KAKAO_MAP_KEY}&autoload=false`
  document.head.appendChild(script)

  script.onload = () => {
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(37.501311, 127.039604),
        level: 3,
      }

      const mapInstance = new window.kakao.maps.Map(container, options)

      const markerPosition = new window.kakao.maps.LatLng(37.501311, 127.039604)

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      })

      marker.setMap(mapInstance)
    })
  }
}
</script>
<style scoped></style>
