import { createApiClient } from '@/utils/http-commons';

const apiClient = createApiClient();

// 비디오 메타데이터 조회
const getVideo = async (videoId, success, fail) => {
  await apiClient.get(`/videos/${videoId}`).then(success).catch(fail)
}

// 특정 유저가 등록한 모든 동영상 메타데이터 조회
const getVideosByUser = async (publicId, success, fail) => {
  await apiClient.get(`/members/${publicId}/videos`).then(success).catch(fail)
}

// 특정 여행에 대한 모든 동영상 메타데이터 조회
const getVideosByTravel = async (travelId, success, fail) => {
  await apiClient.get(`/travels/${travelId}/videos`).then(success).catch(fail)
}

// 특정 위치 주변의 모든 동영상 메타데이터 조회
const getVideosByLocation = async (point, success, fail) => {
  await apiClient.get(`/videos/search?coordinates=${point}`).then(success).catch(fail)
}

// 비디오 업로드 url 발급
const getVideoUploadUrl = (contentType) => {
  return apiClient.get(`/videos/upload-url?contentType=${contentType}`)
}

/**
 * returns
 {
    "contentType": "video/webm",
    "preSignedUrl": "https://travlog-bucket.s3.ap-northeast-2.amazonaws.com/videos/019..."
  }
 */
const getVideoStreamUrl = (videoId) => {
  return apiClient.get(`/videos/${videoId}/stream-url`)
}

// 비디오 메타데이터 업로드
/**
  {
    "coordinates": "POINT(10 10)",
    "videoS3Key": "videos/019363...",
    "videoContentType": "video/webm",
    "title": "",
    "description": ""
  }
 */
const uploadVideoMetadata = (param) => {
  return apiClient.put(`/videos`, param)
}

export { getVideo, getVideosByUser, getVideosByTravel, getVideosByLocation, getVideoUploadUrl, getVideoStreamUrl, uploadVideoMetadata }
