<template>
  <div class="planperiod-view">
    <header>여행 기간이 어떻게 되시나요?</header>
    <RangeCalendar
      v-model="modelValue"
      @update:modelValue="updateModelValue"
    />
    <div v-show="modelValue.end" class="next-btn" @click="handleNextIconClick">
      <font-awesome-icon :icon="['fas', 'arrow-right']" />
    </div>

    <AlertDialog :visible="showModal" @update:visible="handleModalVisibility">
      <div class="period-container">
        <div class="date-wrapper">
          <div class="date">
            {{ modelValue.start.year }} -
            {{ modelValue.start.month }} -
            {{ modelValue.start.day }}
          </div>
          <div>
            부터
          </div>
        </div>
        <div class="date-wrapper">
          <div class="date">
            {{ modelValue.end.year }} -
            {{ modelValue.end.month }} -
            {{ modelValue.end.day }}
          </div>
          <div>
            까지
          </div>
        </div>
      </div>
      <div class="area-wrapper">
        <div class="area">수원</div>
        으로 여행을 다녀올게요!
      </div>
    </AlertDialog>
  </div>
</template>

<script setup>
import RangeCalendar from '@/components/ui/range-calendar/RangeCalendar.vue'
import AlertDialog from '@/components/AlertDialog.vue'
import { ref } from 'vue'

const modelValue = ref({ start: '', end: '' })
const showModal = ref(false)

const updateModelValue = (newValue) => {
  modelValue.value = newValue
}

const handleNextIconClick = () => {
  handleModalVisibility(true)
}

const handleModalVisibility = (newVisibility) => {
  showModal.value = newVisibility;
};

</script>

<style scoped lang="scss">

.planperiod-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: calc(100vh - 4rem);
}

header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  height: 6rem;
}

.period-container {
  display: flex;
  flex-direction: column;
}

.date-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.date {
  display: flex;
  justify-content: center;
  align-items: center;
  color: colors.$highlight-color;
  background-color: colors.$primary-color;
  height: 2rem;
  border-radius: 1rem;
  margin: 0.4rem 0.6rem;
  padding: 0rem 1rem;
  font-size: 0.8rem;
}

.area-wrapper {
  display: flex;
  padding: 0.4rem;
}

.area {
  text-decoration: underline;
}
.next-btn {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 3rem;
  background-color: colors.$secondary-color;
  color: colors.$primary-color;
  border-radius: 50%;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.next-btn:hover {
  transform: scale(1.1);
}

.next-btn:active {
  transform: scale(0.9);
}
</style>
