<template>
  <div v-if="!currentTravel" class="playback-view">
    <div>현재 진행 중인 여행이 없습니다 . . .</div>
    <button @click="handleAddClick">여행 일정 추가</button>
  </div>
  <div v-else>현재 여행 일정</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const currentTravel = ref(null)

const router = useRouter()

const handleAddClick = () => {
  router.push('/plan/area')
}
</script>

<style scoped lang="scss">
.playback-view {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

button {
  position: absolute;
  bottom: 5rem;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 80%;
  background-color: colors.$secondary-color;
  color: white;
  border: none;
  border-radius: 1rem;
  margin: 1rem 0rem;
  font-family: inherit;
  font-size: inherit;
  transition: background-color 0.3s ease;
  cursor: pointer;
}
</style>
