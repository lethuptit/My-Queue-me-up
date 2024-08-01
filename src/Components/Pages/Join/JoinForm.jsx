import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';

import PhoneInput from '../../common/PhoneInput';
import StandardButton from '../../common/Button';
import Form from 'react-bootstrap/Form';
// import LoadingStatus from '../../../common/Loading';
import styles from './JoinForm.module.scss';

import Checkbox from '../../common/Checkbox/Checkbox';
import { queueInfo, createdToken } from '../../../__mocks__/data';
import {Container} from 'react-bootstrap/esm';

export function JoinQueueForm({ queueId, isAdminPage }) {
  const [name, setName] = useState('');
  const [invalidName, setInvalidName] = useState(false);
  const [phone, setPhone] = useState('');
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [emailId, setEmailId] = useState('');
  const [invalidEmailId, setInvalidEmailId] = useState(false);

  const [isJoinDisabled, setIsJoinDisable] = useState(false);  
  const [queuePosition, setQueuePosition] = useState(null);


  // const joinQueueActionStatus = useSelector((state) => state.actionStatus['joinQueue']);
  const joinQueueActionStatus = 'fullfiled';
  // const queueInfo = mockQueue;
  const [saveToLocalStorage, setSaveToLocalStorage] = useState(true);

  const getTokenByphone = ({ queueId, phone, redirect })=>{
    //Need implementing

  };

  // const { notifyByEmail } = useSelector(selectQueueInfo);
  const { notifyByEmail } = queueInfo;
  const navigate = useNavigate();

  const joinQueueHandler = () => {
    
    // e.preventDefault();
    onSubmitGetToken(phone);
    // if (!isInQueue) {
    //   const queueRef = ref(db, 'queue');
    //   const snapshot = await get(queueRef);
    //   const position = snapshot.size + 1; // Position in the queue
    //   await push(queueRef, { userId, name, phone, emailId, status: 'waiting', position });
    //   setIsInQueue(true);
    //   setQueuePosition(position);

    //   // Request notification permission
    //   if (Notification.permission === 'default') {
    //     Notification.requestPermission();
    //   }
    // }


    navigate(`/token/${createdToken.tokenId}`);
    console.log('join queue...')
  };

  //Check  if user in Queue ?
  const onSubmitGetToken = () => {
    //Add user to queue with params: { queueId, phone} and redirect To waiting page when Success
    getTokenByphone({ queueId, phone, redirect:true });
  };

   
  const handleCancel = () => {
    navigate(-1);
  };

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
      setEmailId(localStorageEmail);
    }
  }, []);

  function handleNameChange(e) {
    if (name.match('^[A-Za-z0-9 ]*$')) {
      setName(e.target.value);
      setInvalidName(false);
    } else {
      setInvalidName(true);
    }
    checkJoinDisabled();
    
  }

  function handleEmailChange(e) {
    setEmailId(e.target.value);
    checkJoinDisabled();
  }

  const onSubmit = () => {
    if (invalidPhone || invalidName) return;

    if (name === '') {
      setInvalidName(true);
      return;
    }
    if (phone === '') {
      setInvalidPhone(true);
      return;
    }

    if (emailId === '') {
      setInvalidEmailId(true);
      return;
    }

    if (saveToLocalStorage) {
      localStorage.setItem('phone', phone);
      localStorage.setItem('name', name);
      localStorage.setItem('email', emailId);
    } else {
      localStorage.removeItem('phone');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }

    joinQueueHandler();
  };

  const checkJoinDisabled = () => {
    setIsJoinDisable (
      invalidPhone ||
      invalidName ||
      phone === '' ||
      name === '' ||
      ((emailId === '' || invalidEmailId))
    );
  };

    
  return (
    <Container className={styles.formBox}>
      <div className={styles.formItem}>
        <Form.Label htmlFor="inputPhone">Phone</Form.Label>
        <PhoneInput
          isValid={!invalidPhone}
          setInvalidContact={setInvalidPhone}
          contact={phone}
          onChange={(val) => setPhone(val)}
        />       
        
      </div>
      <div className={styles.formItem}>
        <Form.Label htmlFor="inputName">Name</Form.Label>
        <Form.Control
          type="text"
          id="inputName"
          aria-describedby="passwordHelpBlock"
          placeholder="Name"
          value={name}
          // onKeyPress={(e) => handleEnterPress(e, onSubmit)}
          onChange={handleNameChange}
          error={invalidName}
          helperText={invalidName ? 'Enter a valid name' : ''}
          autoFocus
        />
        
      </div>
      {notifyByEmail ? (
        <div className={styles.formItem}>
        <Form.Label htmlFor="inputEmail">Email</Form.Label>
        <Form.Control
          type="text"
          id="inputEmail"
          aria-describedby="passwordHelpBlock"
          placeholder="Email"
          value={emailId}
          // onKeyPress={(e) => handleEnterPress(e, onSubmit)}
          onChange={handleEmailChange}
          error={invalidEmailId}
          helperText={invalidEmailId ? 'Enter a valid name' : ''}
        />          
        </div>
      ) : null}
        <Checkbox
          name="saveToLocalStorage"
          label="Save for later"
          checked={saveToLocalStorage}
          onChange={() => {
            setSaveToLocalStorage(!saveToLocalStorage);
          }}
        />
      <div className={styles['vertical-buttons']}>
        <StandardButton  variant="contained" disabled={isJoinDisabled} onClick={onSubmit}>
          Join
        </StandardButton>
        <span className={styles.formButtonsSpace}/>
        <StandardButton outlined onClick={handleCancel}>
          Cancel
        </StandardButton>        
      </div>
    </Container>
  );
}

export default JoinQueueForm;
