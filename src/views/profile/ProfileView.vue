<template>
  <div class="profile-view">
    <div class="user-info-container">
      <!-- 프로필 이미지 -->
      <div class="user-info-left">
        <div class="image-wrapper">
          <img :src="defaultImage" alt="profile" class="user-image" />
        </div>
        <div>@{{ user.publicId }}</div>
      </div>
      <!-- 프로필 소개 -->
      <div class="user-info-right">
        <div class="user-bio">
          <div class="user-info-title">Name</div>
          <div class="user-info-content">{{ user.displayName || user.publicId }}</div>
        </div>
        <div class="user-travel-style">
          <div class="user-info-title">Bio</div>
          <div class="user-info-content">{{ user.bio }}</div>
        </div>
      </div>
    </div>

    <!-- 프로필 버튼 -->
    <div class="profile-btn-container" v-if="false">
      <!-- <button class="profile-btn">친구 추가</button> -->
      <button class="profile-btn" @click="handleLogout">프로필 편집</button>
    </div>

    <VideoBox :videos="videos" />
  </div>
</template>

<script setup>
import defaultImage from '@/assets/images/kirby_okxooxoo.png'
import VideoBox from '@/components/VideoCardList.vue'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMemberStore } from '@/stores/member'
import { getVideosByUser } from '@/api/video'

const router = useRouter()
const memberStore = useMemberStore()

const user = ref(memberStore.memberInfo)

const fetchVideosByUser = async () => {
  await getVideosByUser(user.value.publicId, (response) => {
    videos.value = response.data.videos
  }, (err) => {
    console.log("비디오를 불러오는 데 실패하였습니다. err: " + err)
  })
}

const handleLogout = () => {
  memberStore.logout()
  router.replace('/')
}

const videos = ref([])

onMounted(async () => {
  await fetchVideosByUser()
})
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
  margin: 1rem 1rem 2rem 1rem;
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
</style>
