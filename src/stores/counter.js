import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 전역 상태 관리를 위한 기본 제공 코드
// 추후 참고하려고 일부러 안 지움
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
