import { ref } from 'vue'
import { defineStore } from 'pinia'
import {  } from '@/api/travel'

// 현재 여행에 대한 정보
export const useTravelStore = defineStore('travel', () => {
  // 기본 값
  const curTravelInfo = ref({
    travelId: 1, // 임시
  })



  return { curTravelInfo }
}, {
  persist: true,
})
