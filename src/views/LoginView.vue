<template>
  <div>
    <h2>로그인</h2>
    <label>아이디<input type="text" v-model="userId" /></label>
    <label>비밀번호<input type="text" v-model="userPw" /></label>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const userId = ref("")
const userPw = ref("")

</script>
