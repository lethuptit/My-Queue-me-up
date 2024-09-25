import React, { useEffect, useState } from 'react';

import HeaderSection from '../../common/Header/HeaderSection';
import QueueInfoPanel from '../../common/QueueInfo/QueueInfo';
import { StandardButton } from '../../common/Button';
import JoinQueueForm from '../../common/JoinForm/JoinForm';
import styles from './JoinQueue.module.scss';
import { Container, Col, Row } from 'react-bootstrap/esm/';
import { useNavigate, useParams } from 'react-router-dom';
import { getBasicQueueInfoByDate, dbQueueWithCurDateRef } from '../../../api/queue'
import { ref, child, get, update, orderByChild, equalTo, remove, onValue } from "firebase/database";
import { format } from 'date-fns'
import Toast from '../../common/Toast';

function JoinQueue({ queueId, onCancel }) {

  // const [token, setToken] = useState(null);
  const [canJoin, setCanJoin] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const [queueBasicInfo, setQueueBasicInfo] = useState(null)
  const [guestId, setGuestId] = useState(() => {
    let storedUserId = localStorage.getItem('guestId');
    console.log("local guestId", storedUserId)
    return storedUserId;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (queueId) {
      console.log("Getting queue info... ")
      getBasicQueueInfoByDate(queueId)
        .then((snapshot) => {
          // console.log(snapshot.val());
          setQueueBasicInfo(snapshot.basicInfo);

          const guestList = snapshot.guests
          if (guestId && guestList[`${guestId}`] && (guestList[`${guestId}`].status.startsWith("waiting"))) {
            navigate('/join/token', {
              state: {
                ...guestList[`${guestId}`], limitedDuration: snapshot.basicInfo.limitedDuration,
                queueName: snapshot.basicInfo.name, queueDesc: snapshot.basicInfo.description
              }
            })
          }
          console.log("\tDone")
        })
        .catch((err) => {
          console.log("\tError with ", err.message)
        })
    }
  }, [queueId, isRefresh, guestId])

  const handleAddGuest = async (guestToken) => {
    try {

      console.log('Adding a new guests...')
      //Getting queue status
      const snapshot  = await getBasicQueueInfoByDate(queueId)
      if (snapshot) {
        // console.log(snapshot.val());
        //setQueueBasicInfo(snapshot.basicInfo);
        if (snapshot.basicInfo.status !=='Active') {
          //alert("The queue is not active now, please join later.")
          setCanJoin(false);
          return;
        }

        const guestList = snapshot.guests;
        const activeGuests = guestList ? (Object.values(guestList).filter(value => value.status.startsWith('waiting')).length) : 0
          

        if (activeGuests >= Number(queueBasicInfo.limit)) {
          //alert("The queue is full, please join later.")
          setCanJoin(false);
          return;
        }
        //setQueueBasicInfo(prev => ({ ...prev, activeGuests: activeGuests }))
        guestToken.number = (guestList ? (Object.values(guestList).length) : 0) + 1
        guestToken.position = activeGuests + 1
      }


      const dbRef = dbQueueWithCurDateRef(queueId, "/guests")
      // const snapshot = await get(dbRef)
      // if (snapshot) {
      //   const activeGuests = snapshot.val() ? (Object.values(snapshot.val()).filter(value => value.status.startsWith('waiting')).length) : 0
      //   if (activeGuests !== queueBasicInfo.activeGuests)
      //     setQueueBasicInfo(prev => ({ ...prev, activeGuests: activeGuests }))

      //   if (activeGuests >= Number(queueBasicInfo.limit)) {
      //     alert("The queue is full, please join later.")
      //     return;
      //   }

      //   guestToken.number = (snapshot.val() ? (Object.values(snapshot.val()).length) : 0) + 1
      //   guestToken.position = activeGuests + 1
      // }

      //add to DB
      const curDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
      guestToken['updatedAt'] = curDate;
      const updateList = {}
      updateList[`/${guestToken.id}`] = guestToken;

      await update(dbRef, updateList)
      localStorage.setItem('guestId', guestToken.id)
      localStorage.setItem('queueId', queueId)
      setGuestId(guestToken.id)
      navigate('/join/token', {
        state: {
          ...guestToken, limitedDuration: queueBasicInfo.limitedDuration,
          queueName: queueBasicInfo.name, queueDesc: queueBasicInfo.description
        }
      })
    } catch (err) {
      console.log('\tError: ', err.message)
    }
  };

  const handleAfterLeaving = () => {
    setGuestId('')
  }

  const onRefreshClick = () => {
    setCanJoin(true)    
    setIsRefresh(!isRefresh)
  }

  const showJoinForm = () => {

    if (queueBasicInfo.status !== 'Active') {
      return (
        <>
          <p className={styles['message']}>
            Hi! The line is currently not accepting people currently.
          </p>
          <p className={styles['message']}>
            Wait until the line starts accepting people again, or contact the queue manager
          </p>
          <div className={styles.form}>
            <StandardButton onClick={onRefreshClick}>Check Again</StandardButton>
          </div>
        </>
      );
    }
    return (
      <div className={styles['join-form-container']}>
        {!canJoin&&<Toast  subTitle="This queue temporarily does not allow to join. Please come back after some minutes." />}
        <h4 className={styles['message']}>Enter your information</h4>
        <p className={styles['info']}>
          <i>Please make sure the contact number is correct and   available.</i>
        </p>
        <JoinQueueForm queueId={queueId} queueInfo={queueBasicInfo} onJoin={setGuestId} onAddGuest={handleAddGuest} onCancel={onCancel}/>
      </div>
    );
  };

  if (queueBasicInfo)
    return (
      <div className={styles['user-page']}>
        <HeaderSection title={queueBasicInfo.name} subTitle={queueBasicInfo.description} />
        <div className={'container'} >
          <Row className={styles['main-content']}>
            {/* or Show enter information form */}
            <Col md={4} xs={8} className={`mx-auto ${styles['queue-stats']}`}>
              <QueueInfoPanel queueInfo={queueBasicInfo} expendable={false} />
            </Col>
            <Col md={7} xs={12} >
              {showJoinForm()}
            </Col>
          </Row>
        </div>
      </div>
    );
  return null;
};
export default JoinQueue;