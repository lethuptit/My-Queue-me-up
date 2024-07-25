// src/QueueView.js
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../FirebaseConfig';
import './QueueView.css';

const QueueView = () => {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const queueRef = ref(db, 'queue');
    onValue(queueRef, (snapshot) => {
      let queueData = [];
      snapshot.forEach((childSnapshot) => {
        queueData.push({ key: childSnapshot.key, ...childSnapshot.val() });
      });
      queueData.sort((a, b) => a.position - b.position);  // Ensure the queue is sorted by position
      setQueue(queueData);
    });
  }, []);

  return (
    <div className="queue-view-container">
      <h1>Current Line-up</h1>
      <h3 className="wait-time">Your estimated wait time is less than 10 minutes. Please check-in with a volunteer.</h3>
      <p className="wait-time"> Mehndi application will end at 10:30 PM</p>
      <ul className="queue-view-list">
        {queue.slice(0, 20).map((guest, index) => (
          <li key={guest.key} className="queue-view-item">
            {index + 1}. {guest.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueueView;
