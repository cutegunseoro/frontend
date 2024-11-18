<template>
  <div class="login-view">
    <header>Sign Up</header>
    <div class="login-input-container">
      <label for="loginId">아이디</label>
      <input type="text" id="loginId" v-model.trim="loginId" />

      <label for="password">비밀번호</label>
      <input type="password" id="password" v-model="password" />

      <label for="passwordConfirm">비밀번호 확인</label>
      <input type="password" id="passwordConfirm" v-model="passwordConfirm" />

      <label for="publicId">핸들</label>
      <input type="text" id="publicId" v-model.trim="publicId" />
    </div>
    <div class="error-message">{{ errorMessage }}</div>
    <button class="login-btn" @click="handleRegist">회원가입</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const loginId = ref('')
const password = ref('')
const passwordConfirm = ref('')
const publicId = ref('@')
const errorMessage = ref('')

const handleRegist = () => {
  errorMessage.value = '아직 구현 안함 🥲'
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
