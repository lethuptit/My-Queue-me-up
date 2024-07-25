// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDEqqPenrBzLDUTQDTojIpu7-TnTQhBJRw",
//   authDomain: "queue-app-421da.firebaseapp.com",
//   projectId: "queue-app-421da",
//   storageBucket: "queue-app-421da.appspot.com",
//   messagingSenderId: "447460227986",
//   appId: "1:447460227986:web:e0ed235bc66d518a94df4b",
//   measurementId: "G-DQ985FKZBK"
// };

const firebaseConfig = {
  apiKey: "AIzaSyB5A9B03OZuMz88-BICfXF9xYGCdN16BnA",
  authDomain: "realtimedb-24c2e.firebaseapp.com",
  databaseURL: "https://realtimedb-24c2e-default-rtdb.firebaseio.com",
  projectId: "realtimedb-24c2e",
  storageBucket: "realtimedb-24c2e.appspot.com",
  messagingSenderId: "523063178950",
  appId: "1:523063178950:web:0056e8c8188010e563c9c7",
  measurementId: "G-WB057J0Z5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const auth = getAuth(app);// Messaging service
export const messaging = getMessaging(app);
