import React from 'react';
import { QRCode } from 'react-qr-code';
import ConfirmModal from '../Modal';

export const QrCode = ({ queueId, onClose }) => {

  const url = `${window.location.origin}/join/?id=${queueId}`

  const handleClose =()=>{
    if(onClose)
      onClose(false)
  }
  return (
    <ConfirmModal title='QR Code Generator' closeText='Close' onClose={handleClose}>
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p>Scan this QR to line up the event.</p>
        <p >
          {'or visit '}
          <a href={url} target="_blank">
            {url}
          </a>
        </p>
      </div>
    </ConfirmModal>

  );

};


export default QrCode;
