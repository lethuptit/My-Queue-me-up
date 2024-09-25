import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Form, FloatingLabel } from 'react-bootstrap';
import {StandardButton} from '../../common/Button';
import styles from './GuestPage.module.scss';
import HeaderSection from '../../common/Header/HeaderSection';
import { isCodeValid } from '../../../utils/textOperations';
import { getBasicQueueInfoByDate } from '../../../api/queue'
import EventSwiper from './EventSwiper'
import QrScanner from '../../common/QrCode/QrScanner';

function UserPage({onChoose}) {
  const [queueCode, setQueueCode] = useState('');
  const [invalidMsg, setInvalidMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQrScaner, setShowQrScaner] = useState(false);

  const navigate = useNavigate();

  //Get Queue Info from Queue code
  const handleJoinClick = async () => {
    if (queueCode === '') {
      setInvalidMsg("Event code is required.")
      return;
    }
    setIsLoading(true)
    try {
      const queue = await getBasicQueueInfoByDate(queueCode);
      if (queue.basicInfo){
        //navigate(`/join/${queue.basicInfo.queueId}`);
        onChoose(queue.basicInfo.queueId)
      }
      else {
        setInvalidMsg("Queue Not Found")
      }
    } catch (error) {
      setInvalidMsg("Error in getting queue information.")
      console.log(`Error in getting queue info with id ${queueCode}`, error);
    }

    setIsLoading(false)
  };

  const handleTextFieldChange = (e) => {
    const code = e.target.value;
    if (isCodeValid(code)) {
      setQueueCode(code);
      setInvalidMsg('');
    } else {
      setInvalidMsg("Only alphabets, numbers and '-' allowed");
    }
  };

  const handleScanAnyQR = () => {
    setShowQrScaner(true)
  };

  return (
    <div className={styles['user-page']}>
      <HeaderSection title="Choose your event" subTitle="Enter the event's code and join" />
      <EventSwiper />
      <div className={styles['join-queue-form']}>
        <div className={styles['input-box']}>
          <FloatingLabel controlId="floatingInputGrid" label="Event Code">
            <Form.Control
              label="Event Code"
              placeholder="Enter event code"
              aria-label="EventCode"
              onChange={handleTextFieldChange}
              autoFocus variant="filled"
              required
            />
          </FloatingLabel>
          {invalidMsg && <div style={{ color: "red" }}>{invalidMsg}</div>}
        </div>
        <div className={styles['button-group']}>
          <div>
            <StandardButton onClick={handleJoinClick}>Select Queue
            </StandardButton>
            {/* {isLoading&&<Spinner animation="border" />} */}
          </div>
          <div>
            <StandardButton onClick={handleScanAnyQR}>Scan QR</StandardButton>
            {showQrScaner&&<QrScanner onClose={setShowQrScaner}/>}
          </div>
        </div>
      </div>
    </div>
  );
};


export default UserPage;