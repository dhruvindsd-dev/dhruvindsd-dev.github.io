// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
var firebaseConfig = {
  apiKey: "AIzaSyADIG5COZpFunikdaa6M9WOLOhTAdCNlcU",
  authDomain: "testing-pwa-5f25a.firebaseapp.com",
  databaseURL: "https://testing-pwa-5f25a.firebaseio.com",
  projectId: "testing-pwa-5f25a",
  storageBucket: "testing-pwa-5f25a.appspot.com",
  messagingSenderId: "135835589513",
  appId: "1:135835589513:web:e77b56c912dab0bf001f58",
  measurementId: "G-6YP9Z9T5W0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/images/icons/icon-96x96.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
