<template>
  <div class="calendar-view">
    <div class="travel-container">
      <div class="travel-header">
        <div>나의 여행 기록</div>
        <div class="plan-btn" @click="handlePlanClick">일정 추가</div>
      </div>
      <div class="travel-list">
        <div v-for="travelItem in travelList" :key="travelItem.id" class="travel-item">
          <img :src="TravelImage" class="travel-image" />
          <div class="travel-info">
            <div class="travel-area">{{ travelItem.area }}</div>
            <div class="travel-title">{{ travelItem.title }}</div>
            <div class="travel-period">
              {{ removeTimeFromDate(travelItem.startDateTime) }} ~ {{ removeTimeFromDate(travelItem.endDateTime) }}
            </div>
          </div>
          <div class="travel-icon-container">
            <font-awesome-icon
              :icon="['fas', 'video']"
              class="travel-icon"
              @click="handleVideoIconClick(travelItem.id)"
            />
            <font-awesome-icon class="travel-icon delete-icon" :icon="['fas', 'trash']" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TravelImage from '@/assets/images/Suwon.jpg'
import { getTravelsByUser } from '@/api/travel'

import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMemberStore } from '@/stores/member'

const memberStore = useMemberStore()

const router = useRouter()

const handlePlanClick = () => {
  router.push('/plan/area')
}

const handleVideoIconClick = (travelId) => {
  router.push(`/history/${travelId}`)
}

function removeTimeFromDate(dateString) {
  const date = new Date(dateString);
  // 'YYYY-MM-DD' 형식으로 날짜만 추출
  return date.toISOString().slice(0, 10);
}

const fetchTravelList = async (publicId) => {
  await getTravelsByUser(publicId, (response) => {
    travelList.value = response.data.travels
  }, (err) => {
    console.log('여행 일정을 불러오는 데 실패했습니다. err: ' + err)
  })
}

const travelList = ref([])

watch(
  () => memberStore.memberInfo,  // memberInfo를 추적
  async (newInfo) => {
    if (newInfo && newInfo.publicId) {
      await fetchTravelList(newInfo.publicId)
      console.log(travelList.value)
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

.travel-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 1rem;
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

.travel-list {
  height: calc(100vh - 10rem);
  overflow-y: auto;
}

.travel-list::-webkit-scrollbar {
  display: none;
}

.travel-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0rem;
  border-bottom: 1px solid #f0f0f0;
}

.travel-info {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.4rem 1rem;
}

.travel-area {
  background-color: black;
  color: white;
  border-radius: 1rem;
  padding: 0.2rem 0.6rem;
  font-size: 0.8rem;
  font-family: 'Nanum Gothic Regular';
}

.travel-period {
  font-size: 0.8rem;
  font-family: 'Nanum Gothic Regular';
}

.travel-icon-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.4rem 1rem;
}

.travel-icon {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.travel-icon:hover {
  transform: scale(1.2);
}

.travel-icon:active {
  transform: scale(0.9);
}

.delete-icon {
  color: red;
}

.plan-btn {
  cursor: pointer;
}
</style>
