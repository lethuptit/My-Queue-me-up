// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import { ref, onValue, update, remove, push, get } from 'firebase/database';
import { db } from '../../FirebaseConfig';
import './Dashboard.css';

const Dashboard = () => {
  const [queue, setQueue] = useState([]);
  const [newGuestName, setNewGuestName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const queueRef = ref(db, 'queue');
    const unsubscribe = onValue(queueRef, (snapshot) => {
      let queueData = [];
      snapshot.forEach((childSnapshot) => {
        queueData.push({ key: childSnapshot.key, ...childSnapshot.val() });
      });
      queueData.sort((a, b) => a.position - b.position);
      setQueue(queueData);
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  const handleCheckIn = async (guestKey, guestPosition) => {
    setLoading(true);
    try {
        const updatedQueue = queue.filter(guest => guest.key !== guestKey);
        await remove(ref(db, `queue/${guestKey}`));

        // Reorder the remaining guests
        const updates = {};
        updatedQueue.forEach((guest, index) => {
            const newPosition = index + 1;
            if (guest.position !== newPosition) {
                updates[`queue/${guest.key}/position`] = newPosition;
            }
        });

        await update(ref(db), updates);
        setQueue(updatedQueue.map((guest, index) => ({ ...guest, position: index + 1 })));
    } catch (error) {
        console.error('Error checking in guest:', error);
    } finally {
        setLoading(false);
    }
};

  const handleNoShow = async (guestKey, guestPosition) => {
    setLoading(true);
    try {
      const newPosition = queue.length;
      await update(ref(db, `queue/${guestKey}`), { position: newPosition });

      const updatedQueue = queue.map(g => {
        if (g.key === guestKey) {
          return { ...g, position: newPosition };
        } else if (g.position > guestPosition) {
          return { ...g, position: g.position - 1 };
        } else {
          return g;
        }
      });

      setQueue(updatedQueue.sort((a, b) => a.position - b.position));
    } catch (error) {
      console.error('Error handling no-show guest:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGuest = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const queueRef = ref(db, 'queue');
      const snapshot = await get(queueRef);
      const position = snapshot.size + 1;
      await push(queueRef, { name: newGuestName, status: 'waiting', position });
      setNewGuestName('');
    } catch (error) {
      console.error('Error adding guest:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Queue Dashboard</h1>
      <form onSubmit={handleAddGuest} className="add-guest-form">
        <input
          type="text"
          placeholder="Guest Name"
          value={newGuestName}
          onChange={(e) => setNewGuestName(e.target.value)}
          required
        />
        <button type="submit">Add Guest</button>
      </form>
      <h2>
        {queue.length > 1 ? `There are currently ${queue.length} people in the queue` : `There is currently ${queue.length} person in the queue`}
    </h2>
      <ul className="queue-list">
        {queue.map(({ key, name, position }) => (
          <li 
            key={key} 
            className={`queue-item ${position === 0 ? 'current' : ''}`}
          >
            {position}. {name} 
            <div className="action-buttons">
              <button className='check-in' onClick={() => handleCheckIn(key, position)}>Check-In</button>
              <button className='no-show' onClick={() => handleNoShow(key, position)}>No Show</button>
            </div>
          </li>
        ))}
      </ul>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
