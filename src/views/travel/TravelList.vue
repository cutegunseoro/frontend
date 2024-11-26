<template>
  <div class="travel-list">
    <div v-for="travel in travels" :key="travel.travelId" class="travel-item">
      <img :src="TravelImage" class="travel-image" />
      <div class="travel-info">
        <div class="travel-area">{{ travel.area }}</div>
        <div class="travel-title">{{ travel.title }}</div>
        <div class="travel-period">
          {{ removeTimeFromDate(travel.startDateTime) }} ~ {{ removeTimeFromDate(travel.endDateTime) }}
        </div>
      </div>
      <div class="travel-icon-container">
        <font-awesome-icon
          :icon="['fas', 'video']"
          class="travel-icon"
          @click="handleVideoIconClick(travel.travelId)"
        />
        <font-awesome-icon class="travel-icon delete-icon" :icon="['fas', 'trash']" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import TravelImage from '@/assets/images/Suwon.jpg'
import { useRouter } from 'vue-router'

const props = defineProps({
  travels: Array
})

const router = useRouter()

const handleVideoIconClick = (travelId) => {
  router.push(`/history/${travelId}`)
}

function removeTimeFromDate(dateString) {
  const date = new Date(dateString);
  // 'YYYY-MM-DD' 형식으로 날짜만 추출
  return date.toISOString().slice(0, 10);
}
</script>

<style scoped lang="scss">
.travel-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 1rem;
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
