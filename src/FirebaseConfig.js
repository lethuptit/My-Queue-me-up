// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from 'firebase/database';
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut, onAuthStateChanged} from "firebase/auth";
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEqqPenrBzLDUTQDTojIpu7-TnTQhBJRw",
  authDomain: "queue-app-421da.firebaseapp.com",
  databaseURL: "https://queue-app-421da-default-rtdb.firebaseio.com",
  projectId: "queue-app-421da",
  storageBucket: "queue-app-421da.appspot.com",
  messagingSenderId: "447460227986",
  appId: "1:447460227986:web:e0ed235bc66d518a94df4b",
  measurementId: "G-DQ985FKZBK"
};
export const APP_VAPID_KEY = 'BIjB3mp5FGAHDXitKfZmbihn9B1p9YLCuw5ZRjfNhQvzrSNkElucSET_gUJ3zCxOEuPzfroFPtsXVt1sdcfDiFo';

// const firebaseConfig = {
//   apiKey: "AIzaSyB5A9B03OZuMz88-BICfXF9xYGCdN16BnA",
//   authDomain: "realtimedb-24c2e.firebaseapp.com",
//   databaseURL: "https://realtimedb-24c2e-default-rtdb.firebaseio.com",
//   projectId: "realtimedb-24c2e",
//   storageBucket: "realtimedb-24c2e.appspot.com",
//   messagingSenderId: "523063178950",
//   appId: "1:523063178950:web:f45deb86ba5dee6d63c9c7",
//   measurementId: "G-NGWE0LQT6S"
// };
// export const APP_VAPID_KEY = 'BLi0R3iCOpI916s8NPQNf3J2NgfA5ZcacLvxZNFUtB_53CU2hpJFAf-QmP2kuDW6EPvofg0_pluFaJcnifocE-E';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const dbQueues = ref(db, "queues");
export const auth = getAuth(app);// Messaging service
export const messaging = getMessaging(app);


export const getLoggedInUserEmail = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        resolve(user.email);
      } else {
        // No user is signed in
        reject("No user logged in");
      }
    });
  });
};

export {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,}

