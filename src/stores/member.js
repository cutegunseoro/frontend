import { ref } from 'vue'
import { defineStore } from 'pinia'
import { memberConfirm } from '@/api/member'

export const useMemberStore = defineStore('member', () => {
  const memberInfo = ref(null)
  const isLoggedIn = ref(false) // 현재 로그인 상태

  const login = async (loginId, password) => {
    const param = { loginId, password }

    await memberConfirm(param, (response) => {
      if (response.status === 200) {
        // 로그인 성공 시 jwt 세션 스토리지에 저장
        const jwt = response.data.accessToken
        sessionStorage.setItem('jwt', jwt)

        memberInfo.value = response.data.member
        isLoggedIn.value = true
      } else {
        throw new Error('아이디 또는 비밀번호가 잘못되었습니다.')
      }
    }, (err) => {
      throw err
    })
  }

  return { memberInfo, isLoggedIn, login }
})
