importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

// const firebaseConfig = {
//     apiKey: "AIzaSyDEqqPenrBzLDUTQDTojIpu7-TnTQhBJRw",
//     authDomain: "queue-app-421da.firebaseapp.com",
//     projectId: "queue-app-421da",
//     storageBucket: "queue-app-421da.appspot.com",
//     messagingSenderId: "447460227986",
//     appId: "1:447460227986:web:e0ed235bc66d518a94df4b",
//     measurementId: "G-DQ985FKZBK"
// };


const firebaseConfig = {
  apiKey: "AIzaSyB5A9B03OZuMz88-BICfXF9xYGCdN16BnA",
  authDomain: "realtimedb-24c2e.firebaseapp.com",
  databaseURL: "https://realtimedb-24c2e-default-rtdb.firebaseio.com",
  projectId: "realtimedb-24c2e",
  storageBucket: "realtimedb-24c2e.appspot.com",
  messagingSenderId: "523063178950",
  appId: "1:523063178950:web:f45deb86ba5dee6d63c9c7",
  measurementId: "G-NGWE0LQT6S"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  const notificationTitle = 'Queue Update';
  const notificationOptions = {
    body: payload.data.body ,
    icon: '/images/1694872829007.jpg'
  };
  console.log(payload.data.body);
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Queue Me Up - Notification';
  const notificationOptions = {
    body: 'Your turn is up. Please come to check in in 5 minutes.',
    icon: '/images/f1694872829007.jpg'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

// self.addEventListener('notificationclick', (event) => {
//   event.notification.close(); // CLosing the notification when clicked
//   const urlToOpen = event?.notification?.data?.url || 'https://www.test.com/';
//   // Open the URL in the default browser.
//   event.waitUntil(
//     clients.matchAll({
//       type: 'window',
//     })
//     .then((windowClients) => {
//       // Check if there is already a window/tab open with the target URL
//       for (const client of windowClients) {
//         if (client.url === urlToOpen && 'focus' in client) {
//           return client.focus();
//         }
//       }
//       // If not, open a new window/tab with the target URL
//       if (clients.openWindow) {
//         return clients.openWindow(urlToOpen);
//       }
//     })
//   );
// });

