import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import { useNavigate } from 'react-router';
import styles from './QrCode.module.scss';
import ConfirmModal from '../Modal';

function QrScanner({ onClose }) {
  
  const [data, setData] = useState(null);
  const [errMessage, setErrMessage] = useState(null);
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data != null) {
      console.log(`loaded >>>`, data);
      setData(data.text);

      const baseurl = window.location.origin;
      const isValid = data.text.startsWith(baseurl); // QR code is on same origin

      if (isValid) {
        const route = data.text.substring(baseurl.length);
        onClose(false)
        navigate(route);
      } else {
        setErrMessage('The QR code contains an invalid URL');
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleClose = () => {
    onClose(false)
  }



  return (

    <ConfirmModal title='Scan Qr Code' closeText='Stop' onClose={handleClose} >
      <div>
        <div className={styles['qrscan-panel']}>
          {!data && <QrReader
            delay={100}
            onError={handleError}
            onScan={handleScan}
            className={styles['scan-window']}
            facingMode="rear"
            legacyMode={false}
          />}
        </div>
        <div>
          <p>{data}</p>
          <p className={styles['errorMessage']}>{errMessage}</p>
        </div>
      </div>
    </ConfirmModal>
  )

};


export default QrScanner