<template>
  <div class="calendar-view">
    <div class="travel-container">
      <div class="travel-header">
        <div>여행 기록</div>
        <div>일정 추가</div>
      </div>
      <div class="travel-list">
        <div v-for="travelItem in travelList" :key="travelItem.id" class="travel-item">
          <img :src="TravelImage" class="travel-image" />
          <div class="travel-info">
            <div class="travel-area">{{ travelItem.area }}</div>
            <div class="travel-title">{{ travelItem.title }}</div>
            <div class="travel-period">
              {{ travelItem.startDatetime }} ~ {{ travelItem.endDatetime }}
            </div>
          </div>
          <div class="travel-icon-container">
            <font-awesome-icon :icon="['fas', 'video']" class="travel-icon" />
            <font-awesome-icon class="travel-icon delete-icon" :icon="['fas', 'trash']" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TravelImage from '@/assets/images/Suwon.jpg'

import { ref } from 'vue'

const travelList = ref([
  {
    id: 1,
    title: '행궁 나들이',
    area: '수원',
    imgUrl: '',
    startDatetime: '2024-11-26',
    endDatetime: '2024-11-27',
  },
  {
    id: 2,
    title: '행궁 나들이',
    area: '수원',
    imgUrl: '',
    startDatetime: '2024-11-26',
    endDatetime: '2024-11-27',
  },
  {
    id: 3,
    title: '행궁 나들이',
    area: '수원',
    imgUrl: '',
    startDatetime: '2024-11-26',
    endDatetime: '2024-11-27',
  },
  {
    id: 4,
    title: '행궁 나들이',
    area: '수원',
    imgUrl: '',
    startDatetime: '2024-11-26',
    endDatetime: '2024-11-27',
  },
  {
    id: 5,
    title: '행궁 나들이',
    area: '수원',
    imgUrl: '',
    startDatetime: '2024-11-26',
    endDatetime: '2024-11-27',
  },
])
</script>

<style scoped lang="scss">
.calendar-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
}

.travel-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 1rem;
}

.travel-container {
  width: 100%;
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
</style>
