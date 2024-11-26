import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyD7Q5oqoioc5ewcc7tGW8C-ZfW47g_mljU",
  authDomain: "susucup-e0a94.firebaseapp.com",
  projectId: "susucup-e0a94",
  storageBucket: "susucup-e0a94.firebasestorage.app",
  messagingSenderId: "849855161593",
  appId: "1:849855161593:web:5bea72b1935097843f2e28",
  measurementId: "G-MVB9TBG8BG"
});

const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/icon-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
