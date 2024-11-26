<template>
  <div class="calendar-view">
    <div class="travel-container">
      <div class="travel-header">
        <div>나의 여행 기록</div>
        <div class="plan-btn" @click="handlePlanClick">일정 추가</div>
      </div>
      <TravelList :travels="travels"/>
    </div>
  </div>
</template>

<script setup>
import { getTravelsByUser } from '@/api/travel'

import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMemberStore } from '@/stores/member'

import TravelList from './TravelList.vue'

const memberStore = useMemberStore()

const router = useRouter()

const handlePlanClick = () => {
  router.push('/plan/area')
}

const travels = ref([])

const fetchTravelList = async (publicId) => {
  await getTravelsByUser(publicId, (response) => {
    travels.value = response.data.travels
  }, (err) => {
    console.log('여행 일정을 불러오는 데 실패했습니다. err: ' + err)
  })
}



watch(
  () => memberStore.memberInfo,  // memberInfo를 추적
  async (newInfo) => {
    if (newInfo && newInfo.publicId) {
      await fetchTravelList(newInfo.publicId)
      console.log(travels.value)
    } else {
      console.log('memberInfo가 아직 로드되지 않았습니다.')
    }
  },
  { immediate: true }  // 컴포넌트가 마운트될 때 즉시 실행
)
</script>

<style scoped lang="scss">
.calendar-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.travel-container {
  width: 90%;
}

.travel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2rem;
}

.plan-btn {
  cursor: pointer;
}
</style>
