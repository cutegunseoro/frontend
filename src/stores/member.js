import { ref } from 'vue'
import { defineStore } from 'pinia'
import { memberConfirm, memberRegist } from '@/api/member'

export const useMemberStore = defineStore('member', () => {
  // 기본 값
  const memberInfo = ref({
    publicId: "susucup"
  })

  // 현재 로그인 상태
  const isLoggedIn = ref(false)

  const login = async (loginId, password) => {
    const param = { loginId, password }

    await memberConfirm(param, (response) => {
      if (response.status === 200) {
        // 로그인 성공 시 jwt 세션 스토리지에 저장
        const jwt = response.data.accessToken
        sessionStorage.setItem('jwt', jwt)

        memberInfo.value = response.data.memberInfo
        isLoggedIn.value = true
      } else {
        throw new Error('아이디 또는 비밀번호가 잘못되었습니다.')
      }
    }, (err) => {
      throw new Error(err.message)
    })
  }

  const regist = async (loginId, password, publicId) => {
    const param = { loginId, password, publicId }

    await memberRegist(param, (response) => {
      if (response.status === 200) {
        // 회원가입 성공 시
        return true
      } else {
        throw new Error('회원가입에 실패했습니다.')
      }
    }, (err) => {
      throw new Error(err.message)
    })
  }

  const logout = () => {
    sessionStorage.removeItem('jwt');
    memberInfo.value = {};
    isLoggedIn.value = false;
  }

  return { memberInfo, isLoggedIn, login, regist, logout }
}, {
  persist: true,
})
