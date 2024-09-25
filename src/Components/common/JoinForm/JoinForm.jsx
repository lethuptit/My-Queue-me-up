import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';

import PhoneInput from '../PhoneInput';
import { StandardButton } from '../Button';
import { Form, FloatingLabel } from 'react-bootstrap';
import styles from './JoinForm.module.scss';
import Checkbox from '../Checkbox/Checkbox';
import { addNewGuestToken, dbQueueWithCurDateRef } from '../../../api/queue'
import { db, dbQueues } from '../../../FirebaseConfig';
import { format, differenceInMinutes } from 'date-fns';
import validator from 'validator'

const { ref, child, get, set, push, update, remove, onValue, onChildChanged } = require("firebase/database");

export function JoinQueueForm({ queueId, queueInfo, onJoin, isAdmin = false, onAddGuest, onCancel }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [email, setEmail] = useState('');
  const [invalidName, setInvalidName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const [saveToLocalStorage, setSaveToLocalStorage] = useState(true);

  //set saved user's data
  useEffect(() => {
    const localStorageName = localStorage.getItem('name');
    const localStorageContact = localStorage.getItem('phone');
    const localStorageEmail = localStorage.getItem('email');
    if (localStorageName) {
      setName(localStorageName);
    }
    if (localStorageContact) {
      setPhone(localStorageContact);
    }
    if (localStorageEmail) {
      setEmail(localStorageEmail);
    }
  }, []);

  const getTokenByphone = ({ queueId, phone }) => {
    //Need implementing

  };

  const navigate = useNavigate();

  const joinQueue = async () => {
    try {
      console.log('Adding a new guests...')
      const dbRef = dbQueueWithCurDateRef(queueId, "/guests")

      //generate guestID
      const guestId = `guest-${Date.now().toString(36)}${Math.random().toString(36).substr(2, 9)}`;
      const startTime = (new Date()).toISOString();
      //Create new basic token for new guest
      const newToken = {
        id: guestId,
        name, phone,
        email: email,
        status: 'waiting',
        startedTime: startTime,
        queueId: queueInfo.queueId,
        number: queueInfo.totalGuests + 1,
        position: queueInfo.activeGuests + 1
      }
      // const res = await addNewGuestToken(newToken)

      // const snapshot = await get(dbRef);
      // if (snapshot) {
      // const data = snapshot.val();
      // let averageServedTime = data.basicInfo.averageServedTime
      // Update position for new token 
      // let totalGuests = queueInfo.totalGuests;
      // const curPosition = queueInfo.activeGuests;
      // const curPosition = (data ?
      //   Object.values(data).filter(g => g.status && g.status.includes("waiting")).length : 0)
      // newToken.position = curPosition + 1;
      // newToken.number = totalGuests + 1;

      //add to DB
      const updateList = {}
      updateList[`/guests/${guestId}`] = newToken;
      const date = format(Date.now(), ('yyyy-MM-dd'));
      await update(ref(db, `queues/${queueId}/daily_stats/${date}`), updateList)
      if (onJoin) {
        onJoin(guestId)
      }
      if (!isAdmin) {
        localStorage.setItem('guestId', guestId);
      }
      console.log('\tdone')
      // }
    } catch (err) {
      console.log('\tError: ', err.message)
    }
  };

  const handleCancel = () => {
    localStorage.removeItem("queueId");
    localStorage.removeItem("guestId");
    onCancel(null);
    navigate('/join');
  };
  

  function handleNameChange(e) {
    setName(e.target.value);
    setInvalidName(false)
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setInvalidEmail(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (invalidPhone)
      return;

    if (name === '') {
      setInvalidName(true)
      return
    }

    if (email === '' || !validator.isEmail(email)) {
      setInvalidEmail(true);
      return
    }

    if (saveToLocalStorage) {
      localStorage.setItem('phone', phone);
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('phone');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }
    //   //generate guestID
    const guestId = `guest-${Date.now().toString(36)}${Math.random().toString(36).substr(2, 9)}`;
    const startTime = (new Date()).toISOString();

    const newToken = {
      id: guestId,
      name, phone,
      email: email,
      status: 'waiting',
      startedTime: startTime,
      queueId: queueInfo.queueId,
      number: queueInfo.totalGuests + 1,
      position: queueInfo.activeGuests + 1
    }

    if (onAddGuest)
      await onAddGuest(newToken);
    else
      await joinQueue();
  }


  return (
    <Form className={styles.formBox} onSubmit={handleSubmit}>
      <div className={styles.formItem}>
        <PhoneInput
          isValid={!invalidPhone}
          setInvalidContact={setInvalidPhone}
          contact={phone}
          onChange={(val) => setPhone(val)}
        />
      </div>

      <div className={styles.formItem}>
        <FloatingLabel
          controlId="floatingInput"
          label="Name"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            // onKeyPress={(e) => handleEnterPress(e, onSubmit)}
            onChange={handleNameChange}
            autoFocus
            required
          />
          {invalidName && <div className={'text-danger'}>Please provide a name.</div>}
        </FloatingLabel>
      </div>

      <div className={styles.formItem}>
        <FloatingLabel
          controlId="floatingInput"
          label="Email"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            // onKeyPress={(e) => handleEnterPress(e, onSubmit)}
            onChange={handleEmailChange}
            required
          />
          {invalidEmail && <div className={'text-danger'}>Please provide a valid email.</div>}
        </FloatingLabel>
      </div>

      {!isAdmin&&<Checkbox
        name="saveToLocalStorage"
        label="Save for later"
        checked={saveToLocalStorage}
        onChange={() => {
          setSaveToLocalStorage(!saveToLocalStorage);
        }}
      />}
      <div className={styles['vertical-buttons']}>
        <StandardButton variant="contained" onClick={handleSubmit}>
          Join
        </StandardButton>
        <span className={styles.formButtonsSpace} />
        {!isAdmin&&<StandardButton outlined onClick={handleCancel}>
          Cancel
        </StandardButton>}
      </div>
    </Form>
  );
}

export default JoinQueueForm;
