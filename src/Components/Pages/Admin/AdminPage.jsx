/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect, useCallback } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectQueueName } from 'store/selectedQueue';
import Ribbon from '../../common/Ribbon';
import Tour from '../../common/Tour';
// import { useGetSelectedQueue, useGetSelectedQueueHistory } from 'store/asyncActions';
// import { selectQueueInfo } from 'store/queueInfo';
// import { setErrorPopupMessage } from 'store/appSlice';
import {queueInfo, queue} from '../../../__mocks__/data';
import { useNavigate } from 'react-router';
import HeaderSection from './AdminHeaderSection';
import TokenList from './TokenList';
import styles from './admin.module.scss';
import SidePanel from './AdminSidePanel';
import getToursteps from './getTourSteps';
import  {useParams} from 'react-router';
import QueueInfo from './QueueInfo';

const TIMEOUT = 10000;
let timeoutId;

const isQueueDeleted = (queueInfo) => queueInfo?.status === 'DELETED';

const AdminPage = (props) => {
  // const queueId = props.match.params.queueId;
  const params = useParams();
  const queueId = params.queueId;
  // const queueInfo = useSelector(selectQueueInfo);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // if (queueInfo && queueId === queueInfo?.queueId && isQueueDeleted(queueInfo)) {
  //   //dispatch(setErrorPopupMessage('This queue is deleted.'));
  //   console.log('This queue is deleted.')
  //   navigate('/');
  // }

  return <AdminPageView queueId={queueId} />;
};

const AdminPageView = (props) => {
  // const { queueId } = props;
  const params = useParams();
  const queueId = params.queueId;

  // const queueName = useSelector(selectQueueName);
  const queueName = queueInfo.queueName;
  const description = queueName && 'Ready to share';
  // const dispatch = useDispatch();
  // const getSelectedQueue = useGetSelectedQueue();
  // const getSelectedQueueHistory = useGetSelectedQueueHistory();
  
  const [toursteps, setToursteps] = useState(getToursteps(window.innerHeight));
  // const { isAuthenticated } = useAuth0();
  const  isAuthenticated  = true;
  const update = useCallback(() => {
    clearTimeout(timeoutId);
    //dispatch(getSelectedQueue({ queueId }));
    //dispatch(getSelectedQueueHistory({ queueId }));
    timeoutId = setTimeout(update, TIMEOUT);
    // TODO: Check if this is good solution.
    /* eslint-disable-next-line */
  }, [queueId]);

  const resize = () => setToursteps(getToursteps(window.innerWidth));

  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  });

  useEffect(() => {
    update();
    return () => clearTimeout(timeoutId);
  }, [update]);

  return (
    <div className={styles['admin-content']}>
      <Tour toursteps={toursteps} />
      <HeaderSection queueId={queueId} queueName={queueName} description={description} />
      {isAuthenticated ? null : (
        <Ribbon
          title="Temporary queue warning!"
          subTitle="Please sign up to make your queue permanent."
        />
      )}
      <div className={styles['main-body']}>
        <QueueInfo queueId={queueId}/>
        <TokenList queueName={queueName} queueId={queueId} />
        <SidePanel queueId={queueId} />
      </div>
    </div>
  );
};

export default AdminPage;
