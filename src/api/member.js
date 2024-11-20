import { localAxios } from '@/utils/http-commons';

const local = localAxios();

const memberConfirm = async (param, success, fail) => {
  await local.post('/members/login', param).then(success).catch(fail)
}

const memberRegist = async (param, success, fail) => {
  await local.post('/members/signup', param).then(success).catch(fail)
}

export { memberConfirm, memberRegist }
