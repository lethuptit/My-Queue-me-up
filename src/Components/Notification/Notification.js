import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../FirebaseConfig';

const Notification = ({ userId }) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const notificationRef = ref(db, 'queue');
    onValue(notificationRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().userId === userId) {
          setNotification(childSnapshot.val().notification);
        }
      });
    });

    return () => {
    //   notificationRef.off();
    };
  }, [userId]);

  return <div>{notification && <p>{notification}</p>}</div>;
};

export default Notification;