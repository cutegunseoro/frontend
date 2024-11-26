import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const { VITE_VAPID_PUBLIC_KEY } = import.meta.env

const firebaseConfig = {
  apiKey: "AIzaSyD7Q5oqoioc5ewcc7tGW8C-ZfW47g_mljU",
  authDomain: "susucup-e0a94.firebaseapp.com",
  projectId: "susucup-e0a94",
  storageBucket: "susucup-e0a94.firebasestorage.app",
  messagingSenderId: "849855161593",
  appId: "1:849855161593:web:5bea72b1935097843f2e28",
  measurementId: "G-MVB9TBG8BG"
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
