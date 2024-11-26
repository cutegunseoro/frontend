import { createApiClient } from '@/utils/http-commons';

const apiClient = createApiClient();

const getMeInfo = apiClient.get("/me");

const memberConfirm = async (param, success, fail) => {
  await apiClient.post('/auth/login', param).then(success).catch(fail)
}

const memberRegist = async (param, success, fail) => {
  await apiClient.post('/auth/signup', param).then(success).catch(fail)
}

export { getMeInfo, memberConfirm, memberRegist }
