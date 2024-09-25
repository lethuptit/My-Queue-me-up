import React, { useState, useEffect } from 'react';
// import Loading from '../../common/Loading/Loading';
import styles from './GuestPage.module.scss';
import TimeProgressBar from '../../common/ProgressBar/TimeProgressBar';
import { formatTokenNumber } from '../../../utils/textOperations'
import { handleOnValue, dbQueueWithCurDateRef, updateMesTokenId, getBasicQueueInfoByDate, getTokenById } from '../../../api/queue'
import { useLocation, useNavigate } from 'react-router-dom';
import { format, add } from 'date-fns';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LeaveConfirm from '../../common/Modal'
import { getMessaging, getToken } from "firebase/messaging";
import { APP_VAPID_KEY } from '../../../FirebaseConfig'
import { StandardButton } from '../../common/Button';
import { ref, child, get, update, orderByChild, equalTo, remove, onValue } from "firebase/database";
import HeaderSection from '../../common/Header/HeaderSection';


function GuestWaitingStatus({ }) {
  const postData = useLocation()
  const token = postData.state;

  const [show, setShow] = useState(false);
  const [updateToken, setUpdateToken] = useState(token);
  

  // Request notification permission
  useEffect(() => {
    async function requestPermission() {
      //requesting permission using Notification API
      if (updateToken) {
        try {
          const permission = await Notification.requestPermission();

          if (permission === "granted") {
            const mesTokenId = await getToken(getMessaging(), {
              vapidKey: APP_VAPID_KEY,
            });
            console.log("Message Token generated : ", mesTokenId);
            if (!updateToken.notifyTokenId || updateToken.notifyTokenId !== mesTokenId) {
              await updateMesTokenId(updateToken.queueId, updateToken.id, mesTokenId)
            }

          } else if (permission === "denied") {
            //notifications are blocked
            alert("You denied for the notification");
          }
        }
        catch (err) {
          console.log("Error in getting notigication permission  : ", err.message);
        }
      }
    }
    // getBasicQueueInfoByDate(queueId)
    // .then((data)=>{
    //   if(data.guests[tokenId])
    //   setUpdateToken({...data.guests[tokenId], limitedDuration: data.basicInfo.limitedDuration})
    // })
    // .catch((err)=>{
    //   console.log("Error in getting token by id: ", err.message)
    // })
    requestPermission();
  }, [])

  useEffect(() => {
    const unsubscribe = handleOnValue(dbQueueWithCurDateRef(updateToken.queueId, `/guests/${updateToken.id}/updatedAt`), (data) => {
      console.log("Token changed....")
      if (data.val()) {
        try {
          get(dbQueueWithCurDateRef(updateToken.queueId, `/guests/${updateToken.id}`))
            .then((snapshot) => {
              // const limitedDuration = snapshot.basicInfo.limitedDuration;
              const guest = snapshot.val();
              const estWaitTime = guest.position * updateToken.limitedDuration;
              const expTime = format(add(new Date(), { minutes: guest.position * updateToken.limitedDuration }), 'HH:mm')
              setUpdateToken(prev => ({ ...prev, status: guest.status, position: guest.position, estWaitTime: estWaitTime, expTime: expTime }));
            })
            .catch((error) => {
              console.log("Error in: ", error.message)
            })
        } catch (error) {
          console.log("Error in: ", error.message)
        }
      }
      // , { onlyOnce: true}  
    });
    return () => {
      unsubscribe()
    }; // Clean up the listener on component unmount      

  }, []);

  const navigate = useNavigate();
  const handleLeaveQueue = async () => {
    if (updateToken) {
      try {
        console.log("Guest leaving...")
        const activeRef = dbQueueWithCurDateRef(updateToken.queueId, '/guests');
        const snapshot = await get(activeRef)
        if (snapshot && snapshot.val()[updateToken.id].status.startsWith('waiting')) {
          const updatePositions = {};
          updatePositions[`/${updateToken.id}/status`] = "canceled";
          const curDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
          const updatedList = Object.values(snapshot.val()).filter(value => value.status.startsWith('waiting'))
          updatedList.forEach((t) => {
            if (t.position > updateToken.position) {
              //update   new posiotn list for guest in queue
              updatePositions[`/${t.id}/position`] = t.position - 1;
              updatePositions[`/${t.id}/updatedAt`] = curDate;
            }
          });

          await update(activeRef, updatePositions)
        }
        localStorage.removeItem("guestId")
        localStorage.removeItem("queueId")
        handleClose();
        navigate('/join')

      }
      catch (error) {
        console.log("\tError by: ", error.message)
      }
    }
  }

  const handleClose = () => { setShow(false) }

  let isInQueue = updateToken.status.startsWith('waiting')&&updateToken.position>=0;

  const statusInfo = () => {

    if (updateToken.position===0) {
      return (
        <div className={styles['message-update']}>
          <p className={styles['info-message']}>You have been served.</p>
          <p> Happy to have you in our event. Thank you!</p>
        </div>);
    }
    
    else if (!updateToken.status.startsWith('waiting')) {
      return (
        <div className={styles['message-update']}>
          <p className={styles['info-message']}>You are now not in this event.</p>
          <p> Please join for a turn.</p>
        </div>);
    }
    else if (updateToken.status.includes('notified')) {
      return (
        <div className={styles['message-update']}>
          <h3>Your turn is up</h3>
          <p>Please check-in with a volunteer.</p>
        </div>);
    }
    else if (updateToken.position === 1) {
      return (
        <div className={styles['message-update']}>
          <h2 >There is no one ahead of you.</h2>
          <p> Please wait to be notified by the queue manager.</p>
        </div>);
    }
    else {
      return (
        <div className={'center-horizontally()'}>
          <TimeProgressBar duration={updateToken.position * updateToken.limitedDuration} />
          <h5 className={'my-3'}>Your position is {updateToken.position}</h5>
          <div className={'d-flex my-4 justify-content-evenly'}>
            <div className={styles['waiting-time-info']}>
              <p>Expected arrival time</p>
              <h3>{updateToken.expTime}</h3>
            </div>
            <div className={styles['waiting-time-info']}>
              <p>Estimated wait time</p>
              <h3>{updateToken.estWaitTime} mins</h3>
            </div>
          </div>
        </div>
      );
    }
  }

  if (updateToken)
    return (
      <div>
        <HeaderSection title={updateToken.queueName} subTitle={updateToken.queueDesc} />
        <div className={'container mt-4'}>
          <div className={styles['status-box']}>
            <div className={styles['waiting-logo']}>
              <img src="/images/joining-queue-48.png" width={'30px'} />
              <h3>ID - {formatTokenNumber(updateToken.number)}</h3>
            </div>
            <h5>Hello {updateToken.name}, </h5>
            {isInQueue&&<p className={styles['info-message']}>You are now in queue for this event.</p>}
            {/* <p >Please check-in with a volunteer.</p> */}
            {statusInfo()}
            {/* </Loading> */}
            <p style={{ fontStyle: 'italic', paddingTop: '20px' }}>Updated at {updateToken.updatedAt}</p>
            <div className={styles['button-container']}>
            {isInQueue&&<StandardButton className={styles['leave-btn']} variant="contained" icon={<ExitToAppIcon />} onClick={() => setShow(true)}>
                Leave
              </StandardButton>}
              {show && <LeaveConfirm title='Leave Event'
                closeText='Cancel'
                submitText={'Leave'}
                onClose={handleClose}
                onSubmit={handleLeaveQueue}
              >
                <div className={"modal-body confirmation-message"}>
                  Your turn is coming soon. Are you sure you want to leave this event?
                </div>
              </LeaveConfirm>}
            </div>

          </div>
        </div>
      </div >
    );
};

export default GuestWaitingStatus;