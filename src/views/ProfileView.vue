<template>
  <div class="profile-view">
    <div class="user-info-container">
      <!-- 프로필 이미지 -->
      <div class="user-info-left">
        <div class="image-wrapper">
          <img :src="defaultImage" alt="profile" class="user-image" />
        </div>
        <div>{{ user.name }}</div>
      </div>
      <!-- 프로필 소개 -->
      <div class="user-info-right">
        <div class="user-bio">
          <div class="user-info-title">Bio</div>
          <div class="user-info-content">{{ user.bio }}</div>
        </div>
        <div class="user-travel-style">
          <div class="user-info-title">Travel Style</div>
          <div class="user-info-content">{{ user.travelStyle }}</div>
        </div>
      </div>
    </div>

    <!-- 프로필 버튼 -->
    <div class="profile-btn-container">
      <!-- <button class="profile-btn">친구 추가</button> -->
      <button class="profile-btn">프로필 편집</button>
    </div>

    <!-- 해당 유저의 동영상 -->
    <div class="video-container">
      <div v-for="video in videos" :key="video.title" class="video-card">
        {{ video.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import defaultImage from '@/assets/images/kirby_okxooxoo.png'

import { ref } from 'vue'

const user = ref({
  name: '거니',
  bio: '인생은 동영상이다..💭',
  travelStyle: '활동적인',
})

const videos = ref([
  { title: '영상 1' },
  { title: '영상 2' },
  { title: '영상 3' },
  { title: '영상 4' },
  { title: '영상 5' },
  { title: '영상 6' },
  { title: '영상 7' },
  { title: '영상 8' },
])
</script>

<style scoped lang="scss">
.profile-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - 4rem);
}

.user-info-container {
  display: flex;
  width: 90%;
  padding: 1rem;
}

.user-info-left {
  display: flex;
  flex: 4;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.user-info-right {
  display: flex;
  flex-direction: column;
  flex: 6;
}

.user-image {
  width: 90%;
}

.image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100px;
  border: 0.8px solid colors.$primary-color;
  border-radius: 50%;
  overflow: hidden;
  margin: 0.5rem;
}

.user-info-title {
  padding: 0.5rem;
}

.user-info-content {
  display: flex;
  align-items: center;
  background-color: colors.$primary-color;
  height: 2rem;
  border-radius: 1rem;
  padding: 0rem 1rem;
  font-size: 0.8rem;
}

.profile-btn-container {
  display: flex;
  justify-content: center;
  width: 100%;
  /* display: none; */
  margin: 1rem;
}

.profile-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 70%;
  background-color: colors.$secondary-color;
  color: white;
  border: none;
  font-family: inherit;
  font-size: inherit;
  border-radius: 1rem;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.profile-btn:hover {
  background-color: colors.$highlight-color;
}

.video-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  overflow-y: auto;
  width: 100%;
  margin-top: 1rem;
}

.video-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge용 스크롤 바 숨기기 */
}

.video-card {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  aspect-ratio: 9 / 16; /* 세로 동영상 비율 */
  width: 100%;
  background-color: lightgray;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.video-card:hover {
  background-color: darkgray;
}
</style>
