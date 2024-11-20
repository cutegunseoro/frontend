<template>
  <div class="login-view">
    <header>
      <div @click="goBack">
        <font-awesome-icon class="header-icon" size="lg" :icon="['fas', 'angle-left']" />
      </div>
      <div>Sign In</div>
    </header>
    <div class="login-input-container">
      <label for="loginId">아이디</label>
      <input type="text" id="loginId" v-model.trim="loginId" />
      <label for="password">비밀번호</label>
      <input type="password" id="password" v-model="password" />
    </div>
    <div class="error-message">{{ errorMessage }}</div>
    <button class="login-btn" @click="handleLogin">로그인</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
const loginId = ref('')
const password = ref('')
const errorMessage = ref('')

const isFormValid = computed(() => loginId.value !== '' && password.value !== '')

const handleLogin = async () => {
  if (isFormValid.value) {
    errorMessage.value = ''
    // 로그인 시도
    try {
      const response = await axios.post('login URL...', {
        loginId: loginId.value,
        password: password.value,
      })

      if (response.data.success) {
        // 로그인 성공하면
        router.replace('/home')
      } else {
        // 로그인 실패하면
        errorMessage.value = '아이디 또는 비밀번호가 잘못되었습니다 🥲'
      }
    } catch (err) {
      errorMessage.value = '서버 요청에 실패했습니다. 다시 시도해 주세요.'
      console.error(err)
    }
  } else {
    errorMessage.value = '아이디 또는 비밀번호를 입력해 주세요 🔒'
  }
}
</script>

<style scoped lang="scss">
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6rem;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
}

.login-input-container {
  display: flex;
  flex-direction: column;
  width: 80%;
}

.error-message {
  height: 1rem;
  align-content: center; // 텍스트 수직 가운데 정렬
  font-family: 'Nanum Gothic Regular';
  font-size: 0.8rem;
  color: red;
}

.login-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 80%;
  background-color: colors.$secondary-color;
  color: white;
  border: none;
  border-radius: 1rem;
  margin: 1rem 0rem;
  font-family: inherit;
  font-size: inherit;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.login-btn:hover {
  background-color: colors.$highlight-color;
}

header {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 480px;
  width: 100%;
  height: 4rem;
  font-size: 1rem;
  padding: 2rem;
  background-color: colors.$primary-color;
  color: colors.$highlight-color;
  box-sizing: border-box;
  z-index: 1;
}

.header-icon {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.header-icon:hover {
  transform: scale(1.2);
}

input {
  display: flex;
  align-items: center;
  height: 3rem;
  border-radius: 1rem;
  padding: 0rem 1rem;
  margin: 1rem 0rem;
  font-size: 0.8rem;
  border: 1px solid lightgray;
  font-family: inherit;
  color: inherit;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border: 0.1rem solid colors.$highlight-color;
}
</style>
