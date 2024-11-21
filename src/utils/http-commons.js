import axios from 'axios'

const { VITE_VUE_API_URL } = import.meta.env

export const createApiClient = () => {
  const token = sessionStorage.getItem('jwt')

  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '' // JWT 토큰이 있으면 Authorization 헤더에 포함
    }
  })

  return instance
}
