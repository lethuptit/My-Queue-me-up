// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEqqPenrBzLDUTQDTojIpu7-TnTQhBJRw",
  authDomain: "queue-app-421da.firebaseapp.com",
  projectId: "queue-app-421da",
  storageBucket: "queue-app-421da.appspot.com",
  messagingSenderId: "447460227986",
  appId: "1:447460227986:web:e0ed235bc66d518a94df4b",
  measurementId: "G-DQ985FKZBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const auth = getAuth(app);
