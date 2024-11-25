import { createApiClient } from '@/utils/http-commons';

const apiClient = createApiClient();

// 비디오 post 요청하는 함수
const uploadVideo = async (param, success, fail) => {
  await apiClient.post('/videos/upload', param).then(success).catch(fail)
}

// 특정 유저가 등록한 모든 동영상 조회
const getVideosByUser = async (publicId, success, fail) => {
  await apiClient.get(`/members/${publicId}/videos`).then(success).catch(fail)
}

// 특정 여행에 대한 모든 동영상 조회
const getVideosByTravel = async (travelId, success, fail) => {
  await apiClient.get(`/travels/${travelId}/videos`).then(success).catch(fail)
}

// 특정 위치 주변의 모든 동영상 조회
const getVideosByLocation = async (location, success, fail) => {
  await apiClient.get('/videos/search?coordinates=POINT(10 10)').then(success).catch(fail)
}

export { uploadVideo, getVideosByUser, getVideosByTravel, getVideosByLocation }
