<template>
  <div v-if="!currentTravelId" class="plan-view">
    <div>현재 진행 중인 여행이 없습니다 . . .</div>
    <button class="plan-btn" @click="handleAddClick">여행 일정 추가</button>
  </div>
  <TravelVideos v-else :travelId="currentTravelId"/>
</template>

<script setup>
import { getMeInfo } from '@/api/member';
import TravelVideos from '@/components/TravelVideos.vue';
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentTravelId = ref(null)

const handleAddClick = () => {
  router.push('/plan/area')
}

onMounted(async () => {
  currentTravelId.value = (await getMeInfo).data.member.currentTravelId
})
</script>

<style scoped lang="scss">
.plan-view {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 8rem);
  width: 100%;
}

button {
  position: absolute;
  bottom: 1rem;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 70%;
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

.plan-btn:hover {
  background-color: colors.$highlight-color;
}
</style>
