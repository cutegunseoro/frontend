<template>
  <div v-if="!currentTravel">
    <div>현재 진행 중인 여행이 없습니다.</div>
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
  router.push('/add')
}
</script>

<style scoped></style>
