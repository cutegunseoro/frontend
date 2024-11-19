<template>
  <div class="intro-view">
    <div class="image-wrapper vibration" @click="goToHome">
      <img :src="defaultImage" />
    </div>
    <div class="intro-logo">Let's Travlog . . .</div>
    <div class="auth-btn-container">
      <div class="auth-btn" @click="goToLogin">로그인</div>
      <div class="auth-btn" @click="goToRegist">회원가입</div>
    </div>
  </div>
</template>

<script setup>
import defaultImage from '@/assets/images/kirby_okxooxoo.png'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

const goToRegist = () => {
  router.push('/regist')
}

const goToHome = () => {
  router.replace('/home')
}

</script>

<style scoped lang="scss">
.intro-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
 background-color: colors.$primary-color;
}

img {
  width: 90%;
}

.intro-logo {
  color: colors.$highlight-color;
}

.image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0.5rem;
  cursor: pointer;
}

.image-wrapper.vibration {
  animation: vibration 2s ease-in-out infinite;
}

.auth-btn-container {
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 480px;
}

.auth-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 80%;
  background-color: colors.$secondary-color;
  color: white;
  border: none;
  border-radius: 1rem;
  margin-bottom: 1rem;
  font-family: inherit;
  font-size: inherit;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.auth-btn:hover {
  background-color: colors.$highlight-color;
}

@keyframes vibration {
  0% {
    transform: rotate(4deg);
  }
  25% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(4deg);
  }
  75% {
    transform: rotate(-4deg);
  }
  100% {
    transform: rotate(4deg);
  }
}

</style>
