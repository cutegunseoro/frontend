import { createApiClient } from '@/utils/http-commons';

const apiClient = createApiClient();

// 비디오 post 요청하는 함수
const uploadVideo = async (param, success, fail) => {
  await apiClient.post('/videos/upload', param).then(success).catch(fail)
}

export { uploadVideo }
