import React, { useEffect, useCallback, useMemo, useState } from 'react';
import moment from 'moment';
import styles from './QueueAdmin.module.scss';
import { queueInfo as mockQueue } from '../../../../__mocks__/data'
import StandardButton from '../../../common/Button';
import QRCode from '../../../common/Popup/QrCode';
import ShareQueue from './ShareQueue';
import CropFreeIcon from '@material-ui/icons/CropFree';

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

export default ({ queueId, isAuthenticated }) => {
  // const isAuthenticated = true;
  const [showQrCodeModal, setShowQrCodeModal] = useState(false);

  const getQueueInfo = (queueId) => {
    //Need fetch from server
    return mockQueue;
  }

  useEffect(() => {
    if (queueId) {
      getQueueInfo({ queueId });
    }
  }, [queueId]);

  const generateQrCOde = useCallback(() => {
    setShowQrCodeModal(true);
  }, []);

  const {
    status,
    queueName,
    queueCreationTimestamp,
    numberOfActiveTokens,
    totalNumberOfTokens,
    maxQueueCapacity,
    lastRemovedTokenNumber,
  } = mockQueue;

  const availableSlots = maxQueueCapacity - numberOfActiveTokens;

  const creationTime = useMemo(() => {
    if (!queueCreationTimestamp) return '';

    const localTimeStamp = moment(queueCreationTimestamp);
    return `${localTimeStamp.format('LT')} ${localTimeStamp.format('ll')}`;
  }, [queueCreationTimestamp]);

  return (
    <div className={styles['queue-detail']}>
      <DetailRow title="Queue status:" value={status} />
      <DetailRow title="Available Slots:" value={availableSlots} large valueId="slots-value" />
      <DetailRow title="Last token called:" value={lastRemovedTokenNumber} />
      <DetailRow title="Current number of people:" value={numberOfActiveTokens} large />
      <DetailRow title="Total number of people:" value={totalNumberOfTokens} />
      <DetailRow title="Queue creation time:" value={creationTime} />
      {isAuthenticated &&
        <div className='d-flex justify-content-center mt-3'>
          <div className={styles['queue-buttons']}>
            <StandardButton onClick={generateQrCOde} icon={<CropFreeIcon />}>
              QR Code
            </StandardButton>
            {showQrCodeModal && (
              <QRCode queueName={queueName} show={showQrCodeModal} onClose={setShowQrCodeModal} />
            )}
          </div>
          <div className={styles['admin-button']}>
            <ShareQueue tourTag="reactour__shareQueue" queueName={queueName} />
          </div>
        </div>}
    </div>

  );
};
