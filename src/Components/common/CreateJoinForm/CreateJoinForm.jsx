import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { handleEnterPress } from '../../../utils/eventHandling';
import { isQueueNameValid } from '../../../utils/textOperations';
// import { useCreateQueue } from '../../../store/asyncActions';
// import { useDispatch } from 'react-redux';
import LoadingStatus from '../Loading';
import styles from './CreateJoinForm.module.scss';

import Form from 'react-bootstrap/Form';
import InputField from '../InputField';
import StandardButton from '../Button';



const CreateJoinForm = (props) => {
  const [textFieldValue, setTextFieldValue] = useState(props.defaultTextFieldValue);
  const [invalidMsg, setInvalidMsg] = useState('');
  const navigate = useNavigate();
  // const createQueue = useCreateQueue();
  // const dispatch = useDispatch();

  function fetchUserQueues() {     
    // //Fecth User Info
    // const ref = db.ref('queues/');
    // ref.get().then((snapshot) => {
    //   showUserContent(snapshot);
    // }, (errorObject) => {
    //   console.log(errorObject)
    //   reject('Reading Firebase failed in: ' + errorObject.name); s
    // });
  }
  
  const handleCreateClick = () => {
    if (!textFieldValue) {
      setInvalidMsg('Line name is required');
      return;
    }
    //dispatch(createQueue({ queueName: textFieldValue }));
    console.log('Create new queue.')
  };

  const handleJoinClick = () => {
    if (!textFieldValue) setInvalidMsg('Line name is required');
    else {
      navigate(`/j/${textFieldValue}`);
    }
  };

  const handleTextFieldChange = (e) => {
    const queueName = e.target.value;
    if (isQueueNameValid(queueName)) {
      setTextFieldValue(queueName);
      setInvalidMsg('');
    } else {
      setInvalidMsg("Only alphabets, numbers and '-' allowed");
    }
  };

  const handleScanAnyQR = () => {
    navigate('/scanQr');
  };

  return (
    <div data-aos="zoom-in" className={styles['create-join-form']}> 
      <Form.Label htmlFor="queueName">Event</Form.Label>
      <Form.Select id='queueName'>
        <option disabled={true} selected>Select event name select</option>
      </Form.Select>
      <br />
      <div className={styles['input-box']}>
      <Form.Label htmlFor="queueCode">Code</Form.Label>
        <Form.Control
        id='queueCode'
          placeholder="Enter event's code"
          aria-label="QueueCode"
          aria-describedby="basic-addon1"
          onChange={handleTextFieldChange}
          onKeyPress={(e) => handleEnterPress(e, handleCreateClick)}
          error={invalidMsg.length > 0}
          helperText={invalidMsg}
          autoFocus
        />
      </div>
      <div className={styles['button-group']}>
        {/* <LoadingStatus dependsOn="createQueue"> */}
        <div>
          <StandardButton onClick={handleJoinClick}>Enqueue</StandardButton>
        </div>
        <div>
          <StandardButton onClick={handleScanAnyQR}>Scan Any QR</StandardButton>
        </div>
        {/* </LoadingStatus> */}
      </div>
    </div>
  );
};

export default CreateJoinForm;
