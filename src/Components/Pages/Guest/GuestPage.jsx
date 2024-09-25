import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './GuestPage.module.scss';
import JoinQueue from './JoinQueue';
import ChooseQueue from './ChooseQueue'

function GuestPage() {
  const [queueId, setQueueId] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id")
    console.log(id);
    if (id)
      setQueueId(id)
  })


  const handleChooseQueue = (id) => {
    setQueueId(id);
  };

  return (
    <div className={styles['user-page']}>
      {queueId ? <JoinQueue queueId={queueId} onCancel={handleChooseQueue} />
        : <ChooseQueue onChoose={handleChooseQueue} />
      }
    </div>
  );
};


export default GuestPage;