import { localAxios } from '@/utils/http-commons';

const local = localAxios();

const memberConfirm = async (param, success, fail) => {
  await local.post('/auth/login', param).then(success).catch(fail)
}

export { memberConfirm }
