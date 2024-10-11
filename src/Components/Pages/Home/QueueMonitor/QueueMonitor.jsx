import React, { useState, useEffect } from 'react';
import Ribbon from '../../../common/Toast';
import QueueHeader from './QueueViewHeader';
import { format, differenceInMinutes } from 'date-fns';

import styles from './QueueMonitor.module.scss';
import SidePanel from './QueueSidePanel';
import Token from './Token'
import { formatTokenNumber } from '../../../../utils/textOperations'
import { getBasicQueueInfoByDate, dbQueueWithCurDateRef, updateCheckInToken, cancelGuest, updateToken } from '../../../../api/queue';
import { ref, child, get, set, push, update, remove, onValue, onChildAdded, onChildChanged } from "firebase/database";
import { getCurDate } from '../../../../utils/dateFunctions';
import { db, dbQueues } from '../../../../FirebaseConfig';
import { pushNotification, sendSMSNotification, sendEmail } from '../../../../api/notify';
import { Container, Col, Row } from 'react-bootstrap/esm/';
import Paging from '../../../common/Pagination/Paging'

const PAGE_SIZE = 8
const EmptyList = () => {
  return (
    <>
      <p>
        Your queue is currently empty.
      </p>
    </>
  );
};


const QueueMonitorView = (props) => {

  const [queueId, setQueueId] = useState(null)
  const [queueInfo, setQueueInfo] = useState(null)
  const [tokens, setTokens] = useState([])
  const [isRefresh, setIsRefresh] = useState(false)
  const [servingNumber, setServingNumber] = useState('');
  const [currentPage, setCurrentPage] = useState(1)

  //Get Queue basic Info
  useEffect(() => {
    try {
      if (queueId) {
        get(ref(db, `queues/${queueId}`))
          .then(snapshot => {
            if (snapshot.exists()) {
              // const date = format(Date.now(), 'yyyy-MM-dd')
              const queueInfo = snapshot.val();
              const basicInfo = {
                name: queueInfo.name || "Undefined name",
                limit: queueInfo.limit,
                limitedDuration: queueInfo.limitedDuration,
                queueId: queueInfo.id,
                status: queueInfo.status || "Active",
              }
              // setToggleQueueStatus(basicInfo.status)
              setQueueInfo(prev => ({ ...prev, ...basicInfo }))
              console.log("\t done.")
            }
          })
          .catch(err => {
            console.log("\tError with ", err.message)
          })
      }
    }
    catch (err) {
      console.log("\tError with ", err.message)
    }
  }, [queueId, isRefresh])

  // Trigger on tokens, queue status
  useEffect(() => {
    if (queueId) {
      const curDate = getCurDate()
      const queueRef = ref(db, `queues/${queueId}/daily_stats/${curDate}/guests`);

      // const queueRef = ref(db, 'queue');
      const unsubscribe = onValue(queueRef, (snapshot) => {
        let queueData = [];

        snapshot.forEach((childSnapshot) => {
          // console.log(childSnapshot.val())
          if (childSnapshot.val().status.startsWith('waiting'))
            queueData.push({ key: childSnapshot.key, ...childSnapshot.val() });
        });
        queueData.sort((a, b) => a.position - b.position);
        setTokens(queueData);
        setQueueInfo(prev => ({ ...prev, totalGuests: snapshot.size, activeGuests: queueData.length }))
        setCurrentPage(1);
      });

      const unsubscribeStatus = onValue(ref(db, `queues/${queueId}/status`), (snapshot) => {
        if (snapshot) {
          setQueueInfo(prev => ({ ...prev, status: snapshot.val() }))
         
        }
      });

      return () => {
        unsubscribe()
        unsubscribeStatus();
      }; // Clean up the listener on component unmount
    }
  }, [queueId]);

  const handleNoShowUpGuest = async (guestToken) => {
    if (tokens.length === 1)
      return;
    // setLoading(true);
    try { 
      console.log(`Moving guest number: ${guestToken.number}... `)

      const curDate = format(new Date(),'yyyy-MM-dd HH:mm:ss')
      //console.log(curDate)
      const newPosition = tokens.length;
      const updatePositions = {};
      tokens.forEach((t) => {
        if (t.id === guestToken.id) {
          // t.position = newPosition;
          updatePositions[`/guests/${t.id}/position`] = newPosition;
          updatePositions[`/guests/${t.id}/status`] = "waiting";
          updatePositions[`/guests/${t.id}/updatedAt`] = curDate;
        }
        else if (t.position > guestToken.position) {
          //update new posiotn list for guest in queue
          // t.position = t.position - 1;
          updatePositions[`/guests/${t.id}/position`] = t.position - 1;
          updatePositions[`/guests/${t.id}/updatedAt`] = curDate;
        }
      });
      await update(dbQueueWithCurDateRef(queueId), updatePositions)
      // await update(queueRef, updatePositions)
    } catch (error) {
      console.error('Error handling no-show guest:', error);
    } finally {
      // setLoading(false);
    }
  }

  const handleCheckInGuest = async (guestToken) => {
    try {
      console.log(`Checking guest number: ${guestToken.number}... `)
      const startedTime = new Date(guestToken.startedTime)
      const endTime = new Date();
      const waitTime = differenceInMinutes(endTime, startedTime);

      const updatePositions = {};
      updatePositions[`/guests/${guestToken.id}/position`] = 0;
      updatePositions[`/guests/${guestToken.id}/endTime`] = endTime;
      updatePositions[`/guests/${guestToken.id}/waitTime`] = waitTime;
      updatePositions[`/guests/${guestToken.id}/status`] = 'served';
      const curDate = format(new Date(),'yyyy-MM-dd HH:mm:ss')
      updatePositions[`/guests/${guestToken.id}/updatedAt`] = curDate;

      tokens.forEach((t) => {
        if (t.position > guestToken.position) {
          //update new posiotn list for guest in queue
          updatePositions[`/guests/${t.id}/position`] = t.position - 1;
          updatePositions[`/guests/${t.id}/updatedAt`] = curDate;

        }
      });
      await update(dbQueueWithCurDateRef(guestToken.queueId), updatePositions)
      setServingNumber(formatTokenNumber(guestToken.number))
    }
    catch (error) {
      console.log("\tError by: ", error.message)
    }
  }

  const handleCancelGuest = async (guestToken) => {
    try {
      console.log("Canceling guest number: ", guestToken.number)
      const activeRef = dbQueueWithCurDateRef(guestToken.queueId, '/guests');
      get(activeRef)
        .then(async (snapshot) => {
          const updatePositions = {};
          updatePositions[`/${guestToken.id}/status`] = "canceled";

          const curDate = format(new Date(),'yyyy-MM-dd HH:mm:ss')
          updatePositions[`/${guestToken.id}/updatedAt`] = curDate;

          const updatedList = Object.values(snapshot.val()).filter(value => value.status.startsWith('waiting'))
          updatedList.forEach((t) => {
            if (t.position > guestToken.position) {
              //update new posiotn list for guest in queue
              updatePositions[`/${t.id}/position`] = t.position - 1;
              updatePositions[`/${t.id}/updatedAt`] = curDate;
            }
          });
          await update(activeRef, updatePositions)
        });
    }
    catch (error) {
      console.log("\tError by: ", error.message)
    }
  }

  const handleNotifyGuest = async (guestToken) => {
    try {
      console.log("Notifying guest...  ")

      const dbRef = dbQueueWithCurDateRef(guestToken.queueId, `/guests/${guestToken.id}`);
      const updateList = {}
      updateList['status'] = "waiting-notified"
      const curDate = format(new Date(),'yyyy-MM-dd HH:mm:ss')
      updateList[`updatedAt`] = curDate;
    
      await update(dbRef, updateList)

      if(guestToken.notifyTokenId)
        pushNotification(guestToken.notifyTokenId);
      sendSMSNotification(queueInfo.name, guestToken.phone, guestToken.name)
      sendEmail({
        queueId:guestToken.queueId, 
        fromEmail:'queuemeupteam@gmail.com',
        fromName: "Queue Me Up",
        toName: guestToken.name,
        toEmail:guestToken.email, 
        subject: 'Queue Me Up - Your turn is up',
        message:`\nYour turn is up.\nPlease check in with a volunteer.\nThank you.\n`
      })        
    }
    catch (error) {
      console.log("\tError in sending notification: ", error.message)
      // setNotifyStatus('')
    }
  };

  const handleAddGuest = async (guestToken) => {
    try {
      if (queueInfo.status === 'Paused') {
        alert("The queue is paused, can't add a new guest.")
        return;
      }
      if (queueInfo.activeGuests >= Number(queueInfo.limit)) {
        alert("The queue is full, please join later.")
        return;
      }
      console.log('Adding a new guests...')
      guestToken.position = queueInfo.activeGuests + 1;
      guestToken.number = queueInfo.totalGuests + 1;
      const curDate = format(new Date(),'yyyy-MM-dd HH:mm:ss')
      guestToken.updatedAt = curDate;
      const dbRef = dbQueueWithCurDateRef(queueId, "/guests")

      // const res = await addNewGuestToken(newToken)
      //add to DB
      const updateList = {}
      updateList[`/${guestToken.id}`] = guestToken;
      await update(dbRef, updateList)

      console.log('\tdone')
    } catch (err) {
      console.log('\tError: ', err.message)
    }
  };

  return (
    <div className={styles['queue-view']}>
      <QueueHeader title="Queue Monitor"
        onRefresh={setIsRefresh}
        onChangeQueue={setQueueId}
      />
      
      {/* <Container > */}
      {queueInfo && (
        <div className={`row justify-content-around mt-2`}>
          <div className={`col col-xl-4 col-md-5 col-xs-8 ${styles['side-admin-panel']}`}>
            <SidePanel
              queueInfo={queueInfo}
              onAddGuest={handleAddGuest}
            />
          </div>
          <div className={`col col-xl-6 col-md-7 col-xs-10 ${styles['token-list-contaner']}`}>
            <div>
              {servingNumber && <div className={styles['serving-numer']}>
                <Ribbon className={styles['serving-numer']} title="Serving" subTitle={`Number ${servingNumber}`} />
                {/* <h5>Number {servingNumber} </h5> */}
              </div>}
              <h4 className={'text-center'}>Waiting List</h4>
              {/* <ul> */}
              <div className={styles['token-list']} />
              {tokens.length === 0 ? (<EmptyList />)
                :
                tokens.slice((currentPage-1)*PAGE_SIZE, currentPage*PAGE_SIZE).map((token) =>
                  <Token token={token} key={token.id}
                    onNoShowUp={handleNoShowUpGuest}
                    onCheckIn={handleCheckInGuest}
                    onCancel={handleCancelGuest}
                    onNotify={handleNotifyGuest}
                  />)
              }

              {tokens.length > 8 &&
                // <Paging/>
                <Paging totalItems={tokens.length}  onSelectedPage={setCurrentPage} currentPage={currentPage} />
              }
            </div>
            {/* {loading && (
              <div className="loading-overlay">
                <div className="spinner"></div>
              </div>
            )} */}
            {/* </Loading> */}
          </div>
        </div>)
      }
    </div >
  )

};

export default QueueMonitorView;
