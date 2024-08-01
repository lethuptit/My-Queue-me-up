import React, { useCallback, useEffect, useState } from 'react';
import { ref, push, query, orderByChild, equalTo, get, onValue } from 'firebase/database';

// import { useGetQueueInfoByName } from 'store/asyncActions';
// import { selectQueueInfo } from 'store/queueInfo';
import HeaderSection from '../../common/HeaderSection';
import QueueInfoPanel from '../Queue/QueueInfo/QueueInfoPanel';
// import LoadingStatus from 'components/common/Loading';
import Button from '../../common/Button';
import JoinQueueForm from '../Join/JoinForm';
import styles from './JoinQueuePage.module.scss';
import { useParams } from 'react-router';
import { db } from '../../../FirebaseConfig';

import { queueInfo as mockQueue } from '../../../__mocks__/data';
import { Container, Col } from 'react-bootstrap/esm/';

export default ({ match, userId }) => {
  const [isInQueue, setIsInQueue] = useState(false);
  const [queuePosition, setQueuePosition] = useState(null);

  const { queueName } = useParams();
  // console.log(params.queueName)
  // const queueName = match.params.queueName;

  // const getQueueInfoByName = useCallback(useGetQueueInfoByName(), []);
  // const dispatch = useDispatch();
  // const queueInfo = useSelector(selectQueueInfo);
  const queueInfo = mockQueue;

  // useEffect(() => {
  //   dispatch(getQueueInfoByName({ queueName }));
  // }, [queueName, dispatch, getQueueInfoByName]);

  const queueId = queueInfo.queueId;

  useEffect(() => {
    const checkIfInQueue = async () => {
      const queueRef = query(ref(db, 'queue'), orderByChild('userId'), equalTo(userId));
      const snapshot = await get(queueRef);
      if (snapshot.exists()) {
        setIsInQueue(true);
        snapshot.forEach(childSnapshot => {
          setQueuePosition(childSnapshot.val().position);
        });
      }
    };

    //checkIfInQueue();
  }, [queueId, userId]);

  useEffect(() => {
    if (isInQueue) {
      const queueRef = ref(db, 'queue');
      onValue(queueRef, (snapshot) => {
        const queueData = [];
        snapshot.forEach(childSnapshot => {
          queueData.push(childSnapshot.val());
        });
        queueData.sort((a, b) => a.position - b.position);
        queueData.forEach((item, index) => {
          if (item.userId === userId) {
            setQueuePosition(item.position);
          }
        });
      });
    }
  }, [isInQueue, userId]);

  const onRefreshClick = () => {
    //  dispatch(getQueueInfoByName({ queueName }));
  };

  const showJoinQueueForm = () => {

    if (queueInfo.status === 'PAUSED') {
      return (
        <>
          <p className={styles['message']}>
            Hi! The line is currently not accepting people currently.
          </p>
          <p className={styles['message']}>
            Wait until the line starts accepting people again, or contact the queue manager
          </p>
          <div className={styles.form}>
            <Button onClick={onRefreshClick}>Check Again</Button>
          </div>
        </>
      );
    }
    return (
      <div className={styles['join-form-container']}>
        <h4 className={styles['message']}>Enter your information</h4>
        <p className={styles['message']}>
          <i>Please make sure the contact number is correct and is available.</i>
        </p>
        <JoinQueueForm queueId={queueId} />
        
      </div>
    );
  };
  // TODO: If HeaderSection is used just in JoinPage
  // it should be renamed into something else and moved
  // closer to JoinPage
  return (
    <div>
      <HeaderSection queueName={queueName} />
      <Container className={styles['main-content']}>
        {/* <LoadingStatus dependsOn="getQueueInfoByName"> */}
        <Col md={5} xs={8} className={styles['queue-stats']}>
          <QueueInfoPanel queueInfo={queueInfo} expanded={true} />
        </Col>
        <Col md={5} xs={11}>
          {queuePosition === 0 ? (
            <div className="turn-notification">
              <h2>It's your turn!</h2>
              <p>Please check-in.</p>
            </div>
          ) : isInQueue ? (
            <div>
              <h2 className="notification">You are in the queue!</h2>
              {queuePosition !== null && <p>Your position is: {queuePosition}</p>}
            </div>
          ) : (
            showJoinQueueForm()
          )}
        </Col>

        {/* </LoadingStatus> */}
      </Container>
    </div>
  );
};
