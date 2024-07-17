// src/JoinQueue.js
import React, { useState, useEffect } from 'react';
import { ref, push, query, orderByChild, equalTo, get, onValue } from 'firebase/database';
import { db } from '../../FirebaseConfig';
import './JoinQueue.css';

const JoinQueue = ({ userId }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isInQueue, setIsInQueue] = useState(false);
  const [queuePosition, setQueuePosition] = useState(null);

  useEffect(() => {
    const checkIfInQueue = async () => {
      const queueRef = query(ref(db, 'queue'), orderByChild('userId'), equalTo(userId));
      const snapshot = await get(queueRef);
      if (snapshot.exists()) {
        setIsInQueue(true);
        snapshot.forEach(childSnapshot => {
          setQueuePosition(childSnapshot.val().position);
        });
      }
    };

    checkIfInQueue();
  }, [userId]);

  useEffect(() => {
    if (isInQueue) {
      const queueRef = ref(db, 'queue');
      onValue(queueRef, (snapshot) => {
        const queueData = [];
        snapshot.forEach(childSnapshot => {
          queueData.push(childSnapshot.val());
        });
        queueData.sort((a, b) => a.position - b.position);
        queueData.forEach((item, index) => {
          if (item.userId === userId) {
            setQueuePosition(item.position);
          }
        });
      });
    }
  }, [isInQueue, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isInQueue) {
      const queueRef = ref(db, 'queue');
      const snapshot = await get(queueRef);
      const position = snapshot.size + 1; // Position in the queue
      await push(queueRef, { userId, name, phone, status: 'waiting', position });
      setIsInQueue(true);
      setQueuePosition(position);

      // Request notification permission
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  };

  return (
    <div className="join-queue-container">
      {queuePosition === 0 ? (
        <div className="turn-notification">
          <h2>It's your turn!</h2>
          <p>Please check-in.</p>
        </div>
      ) : isInQueue ? (
        <div>
          <h2 className="notification">You are in the queue!</h2>
          {queuePosition !== null && <p>Your position is: {queuePosition}</p>}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="join-queue-form">
          <h2>Join Queue</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="input-field"
          />
          <button type="submit" className="join-button">Join Queue</button>
        </form>
      )}
    </div>
  );
};

export default JoinQueue;
