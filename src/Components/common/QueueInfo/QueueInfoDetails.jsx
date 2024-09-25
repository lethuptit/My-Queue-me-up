import React, { useState } from 'react';
import styles from './QueueInfoDetails.module.scss';
import {StandardButton} from '../Button';
import { QrGenerator } from '../QrCode';

const DetailRow = ({ title, value, large, valueId }) => (
  <div className={styles['detail-row']}>
    <span className={styles['detail-name']}>{title}</span>
    <span
      className={`${styles['detail-value']} ${large ? styles['large-value'] : ''}`}
      data-testid={valueId}
    >
      {value}
    </span>
  </div>
);

function QueueInfoDetails ({ queueInfo, isAdmin }){
  const [showQrCodeModal, setShowQrCodeModal] = useState(false);

  const generateQrCOde = () => {
    setShowQrCodeModal(true);
  };

  const {
    status,
    limit,
    limitedDuration,
    activeGuests,
    totalGuests,
    queueId
  } = queueInfo;

  let availableSlots = 0;
  if (limit || limit !== undefined)
    availableSlots = limit - activeGuests;
  else
    availableSlots = 'Unlimit'
  
  return (
    <div className={`${styles['queue-detail']} `}>
      <DetailRow title="Queue code:" value={queueId} />
      <DetailRow title="Queue status:" value={status?status.toUpperCase():''} />
      <DetailRow title="Available Slots:" value={availableSlots} large valueId="slots-value" />
      {/* {servingGuest &&
        <DetailRow title="Last token called:" value={servingGuest || 0} />} */}
      <DetailRow title="Current number of people:" value={activeGuests || 0} large />
      {isAdmin&&<DetailRow title="Total number of people:" value={totalGuests || 0} />}
      {limitedDuration&&<DetailRow title="Max Serving Duration (mins):" value={limitedDuration} />}
      {isAdmin &&
        <div className={'d-flex justify-content-center mt-3'}>
          <div className={styles['queue-buttons']}>
            <StandardButton onClick={generateQrCOde} >
              Show QR Code
            </StandardButton>
            {showQrCodeModal && (
               <QrGenerator queueId={queueId} show={showQrCodeModal} onClose={setShowQrCodeModal} />
            )}
          </div>
        </div>}
    </div>

  );
};

export default QueueInfoDetails
