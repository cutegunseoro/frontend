import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const { VITE_VAPID_PUBLIC_KEY } = import.meta.env

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

// Firebase Messaging 초기화
const messaging = getMessaging(app);

// 푸시 알림 권한 요청
export const requestPermission = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: VITE_VAPID_PUBLIC_KEY });
    if (token) {
      console.log('FCM Token:', token);
      // 서버에 토큰을 저장하거나 푸시 알림을 보낼 때 사용
    } else {
      console.log('No registration token available.');
    }
  } catch (error) {
    console.error('Error getting permission or token:', error);
  }
};

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);

  // UI에 알림 표시
  if (Notification.permission === 'granted') {
    new Notification(payload.notification.title, {
      body: payload.notification.body,
      icon: payload.notification.icon,
    });
  }
});
