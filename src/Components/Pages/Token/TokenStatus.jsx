import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useGetToken } from 'store/asyncActions';
// import { selectToken } from 'store/token';
// import { selectQueueInfo } from 'store/queueInfo';
import Loading from '../../common/Loading/Loading';
import StandardButton from '../../common/Button';
import Button from '../../common/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import Tooltip from '@mui/material/Tooltip';
import styles from './Token.module.scss';
import {createdToken, queueInfo} from '../../../__mocks__/data';

export default () => {
  // const token = useSelector(selectToken);
  const token = createdToken;
  // const queueInfo = useSelector(selectQueueInfo);
  // const dispatch = useDispatch();
  // const getToken = useGetToken();
 

  const handleCheckIn = () => {
    //dispatch(getToken({ tokenId: token.tokenId }));

  };

  const onExit = () => {
    //Need to implement to remove user from the queue
  };

  let status = null;
  if (token.tokenStatus === 'REMOVED') {
    status = <p>You have been removed from the queue.</p>;
  } else if (token.tokenStatus === 'NOTIFIED') {
    status = <p>Your turn is up, please proceed to the counter</p>;
  } else if (token.aheadCount === 0) {
    status = <p>There is no one ahead of you. Please wait to be notified by the queue manager.</p>;
  } else {
    /* eslint-disable react/jsx-one-expression-per-line */
    status = (
      <>
        <h3>Current Line-up</h3>        
        <br />
        <h3 className={styles["wait-time"]}>Your estimated wait time is less than 10 minutes. Please check-in with a volunteer.</h3>
        {/* <p className="wait-time"> Mehndi application will end at 10:30 PM</p>         */}
      </>
    );
  }
  const handleRefresh=()=>{

  }

  return (
    <div className={styles['status-box']}>
      <Loading isLoading={!token.tokenStatus}>
        <div className={styles['refresh-button']}>
          <Tooltip title='Refresh Info' arrow>
          <StandardButton onClick={handleRefresh} icon={<RefreshIcon />} outlined/>    
          </Tooltip>        
        </div>
        <h6>Hello {token.name}, </h6>
        <br />
        {/* <p>Last token number called:</p> */}
        {/* <p className={styles['count']}>{queueInfo.lastRemovedTokenNumber}</p> */}
        {status}
        <div className={styles['button-container']}>
          <Button onClick={handleCheckIn}>Check In</Button> &nbsp;
          <Button onClick={onExit}>Exit</Button>
        </div>
      </Loading>
    </div>
  );
};
