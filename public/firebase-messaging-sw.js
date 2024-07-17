importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyDEqqPenrBzLDUTQDTojIpu7-TnTQhBJRw",
    authDomain: "queue-app-421da.firebaseapp.com",
    projectId: "queue-app-421da",
    storageBucket: "queue-app-421da.appspot.com",
    messagingSenderId: "447460227986",
    appId: "1:447460227986:web:e0ed235bc66d518a94df4b",
    measurementId: "G-DQ985FKZBK"
};

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  const notificationTitle = 'Queue Update';
  const notificationOptions = {
    body: payload.data.body,
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
