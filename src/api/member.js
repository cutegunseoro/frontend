import { createApiClient } from '@/utils/http-commons';

const apiClient = createApiClient();

const memberConfirm = async (param, success, fail) => {
  await apiClient.post('/auth/login', param).then(success).catch(fail)
}

const memberRegist = async (param, success, fail) => {
  await apiClient.post('/auth/signup', param).then(success).catch(fail)
}

export { memberConfirm, memberRegist }
