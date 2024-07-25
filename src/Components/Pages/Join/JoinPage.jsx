import React, { useCallback, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useGetQueueInfoByName } from 'store/asyncActions';
// import { selectQueueInfo } from 'store/queueInfo';
import HeaderSection from '../../common/HeaderSection';
import QueueInfo from '../Queue/QueueInfo';
// import LoadingStatus from 'components/common/Loading';
import Button from '../../common/Button';
import JoinQueueForm from './JoinForm';
import styles from './JoinPage.module.scss';
import MyTokens from './MyTokens';
import { useParams } from 'react-router';

import {queueInfo as mockQueue} from '../../../__mocks__/data';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';

export default ({ match }) => {
  const {queueName} = useParams();
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

  const onRefreshClick = () => {
    //  dispatch(getQueueInfoByName({ queueName }));
  };

  const getJoinQueueOptions = () => {
    if (queueInfo.status === 'PAUSED') {
      return (
        /* eslint-disable react/jsx-one-expression-per-line */
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
      <>
        <p className={styles['message']}>Please enter your contact details to join this line</p>
        <JoinQueueForm queueId={queueId} buttonText="Join Queue" />
        <p className={styles['message']}>
          Please make sure the contact number is correct and is available, you might be called on
          the number when your turn comes.
        </p>
      </>
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
          {/* <MyTokens queueInfo={queueInfo} /> */}
          <Col md={5} xs={8} className={styles['queue-stats']}>
            <QueueInfo queueInfo={queueInfo} />
          </Col>
          <Col md={5} xs={8}>
            {getJoinQueueOptions()}
          </Col>
          
        {/* </LoadingStatus> */}
      </Container>
    </div>
  );
};
