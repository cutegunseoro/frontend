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

const firebaseApp = initializeApp(firebaseConfig);

// Firebase Messaging 초기화
const firebaseMessaging = getMessaging(firebaseApp);

// 푸시 알림 권한 요청
async function requestPermission() {
  try {
    const token = await getToken(firebaseMessaging, {
      vapidKey: VITE_VAPID_PUBLIC_KEY
    });

    if (token) {
      console.log('FCM Token:', token);
      // TODO: 서버에 해당 토큰 전송하기
    } else {
      console.log('No registration token available.');
    }
  } catch (error) {
    console.error('Error getting permission or token:', error);
  }
};

// foreground notification
onMessage(firebaseMessaging, (payload) => {
  console.log('Received foreground message: ', payload);

  const notificationTitle = payload.notification?.title || 'Default Title';
  const notificationOptions = {
    body: payload.notification?.body || 'Default Body',
    icon: payload.notification?.icon || '/icon-192x192.png',
  };

  // use service worker if possible
  if (navigator.serviceWorker?.ready) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(notificationTitle, notificationOptions);
    });
  } else if (Notification.permission === 'granted') {
    new Notification(notificationTitle, notificationOptions);
  } else {
    console.error('Notification permissions not granted');
  }
});

export {requestPermission};
