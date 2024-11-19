<script setup>
import KakaoMap from '@/components/KakaoMap.vue'
import VideoBox from '@/components/VideoBox.vue'
</script>

<template>
  <div class="home-view">
    <KakaoMap />
    <div class="search-container">
      <input />
      <font-awesome-icon class="search-icon" size="lg" :icon="['fas', 'magnifying-glass']" />
    </div>
    <VideoBox />
  </div>
</template>

<style scoped lang="scss">
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - 4rem);
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
  width: 100%;
  background-color: colors.$primary-color;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

input {
  width: 70%;
  height: 2rem;
  border-radius: 1rem;
  padding: 0rem 1rem;
  margin: 0rem 1rem;
}

input:focus {
  outline: none;
  border: 0.1rem solid colors.$highlight-color;
}

.search-icon {
  color: colors.$highlight-color;
  cursor: pointer;
}
</style>
