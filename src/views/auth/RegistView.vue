<template>
  <div class="login-view">
    <header>Sign Up</header>
    <div class="login-input-container">
      <label for="loginId">아이디</label>
      <input type="text" id="loginId" v-model.trim="loginId" required />

      <label for="password">비밀번호</label>
      <input type="password" id="password" v-model="password" required />

      <label for="passwordConfirm">비밀번호 확인</label>
      <input type="password" id="passwordConfirm" v-model="passwordConfirm" required />

      <label for="publicId">핸들</label>
      <input type="text" id="publicId" v-model.trim="publicId" required />
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
const publicId = ref('')
const errorMessage = ref('')

const idRegExp = /^[A-Za-z0-9]{8,}$/
const pwRegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
const handleRegExp = /^[A-Za-z0-9]{4,}$/

const handleRegist = () => {
  if (isValidForm()) {
    errorMessage.value = '회원가입 유효성 검사 통과'
  }
}

const isValidForm = () => {
  if (!idRegExp.test(loginId.value)) {
    errorMessage.value = '아이디는 8자 이상이어야 합니다.'
    return false
  } else if (!pwRegExp.test(password.value)) {
    errorMessage.value = '비밀번호는 영문, 숫자, 특수문자(!@#$%^&*)을 포함하여 8자 이상이어야 합니다.'
    return false
  } else if (password.value !== passwordConfirm.value) {
    errorMessage.value = '비밀번호 확인이 일치하지 않습니다.'
    return false
  } else if (!handleRegExp.test(publicId.value)) {
    errorMessage.value = '핸들은 4자 이상이어야 합니다.'
    return false
  }

  return true
}

// 모든 input은 채워져 있어야 함
// 비밀번호, 비밀번호 확인 일치해야 함
// 아이디와 비밀번호는 8자리 이상, 아이디는 영문, 숫자 사용 가능, 비밀번호는 영문, 숫자, 일부 특수문자 반드시 1글자 이상 포함
// (id: /^[A-Za-z0-9]{8,}$/, pw : /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)

// 중복 검사는 서버에서
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
