// firebase-messaging-sw.js



// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');


// Initialize the Firebase app in the service worker by passing in your app's Firebase config object.
firebase.initializeApp({
    apiKey: "AIzaSyCEk9KiIJJ70r3rtv0fl7jyNNwGIL2pJ8s",
    authDomain: "fir-56526.firebaseapp.com",
    projectId: "fir-56526",
    storageBucket: "fir-56526.appspot.com",
    messagingSenderId: "1034723389532",
    appId: "1:1034723389532:web:ea745b819d4f949223b699",
    measurementId: "G-10YRD4VBXR"
  });

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload.notification);

    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image || '/firebase-logo.png' // Fallback to a default icon if none is provided
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
