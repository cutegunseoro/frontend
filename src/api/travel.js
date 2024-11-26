import { createApiClient } from '@/utils/http-commons';

const apiClient = createApiClient();

// 여행 일정 등록
const createTravel = async (param, success, fail) => {
  await apiClient.post('/travels', param).then(success).catch(fail)
}

// 모든 여행 일정 조회
const getTravelsByUser = async (publicId, success, fail) => {
  // console.log(publicId)
  await apiClient.get(`/members/${publicId}/travels`).then(success).catch(fail)
}

export { createTravel, getTravelsByUser }
