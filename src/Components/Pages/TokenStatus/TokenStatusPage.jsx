import HeaderSection from '../../common/HeaderSection';
import React, { useEffect, useCallback } from 'react';

// import { useDispatch, useSelector } from 'react-redux';
// import { useGetToken } from 'store/asyncActions';
// import { selectToken } from 'store/token';
import styles from './status.module.scss';
import TokenStatus from './TokenStatus';
import TokenSidePanel from './TokenSidePanel';
import TokenNumber from './TokenNumber';
import { useParams } from 'react-router';
import {createdToken} from '../../../__mocks__/data';

function TokenStatusPage(props) {
  // const tokenId = props.match.params.tokenId;
  const {tokenId} = useParams();
  // const dispatch = useDispatch();
  // const token = useSelector(selectToken);
  const token = createdToken;
  // const getToken = useCallback(useGetToken(), []);

  // useEffect(() => {
  //   dispatch(getToken({ tokenId, refresh: true }));
  // }, [tokenId, dispatch, getToken]);

  return (
    <>
      <HeaderSection queueName={token ? token.queueName : 'Loading...'} />
      <div className={styles['main-body']}>
        <TokenNumber />
        <TokenStatus />
        <TokenSidePanel />
      </div>
    </>
  );
}

export default TokenStatusPage;
