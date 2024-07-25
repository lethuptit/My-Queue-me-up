import Loading from '../../common/Loading/Loading';
import React from 'react';
// import { useSelector } from 'react-redux';
// import { selectToken } from 'store/token';
import {createdToken, queueInfo} from '../../../__mocks__/data';

import styles from './status.module.scss';

export default () => {
  // const token = useSelector(selectToken);
  const token = createdToken;

  return (
    <div className={styles['token-number']}>
      <div className={styles['hanging-threads']} />
      <div className={styles['token-container']}>
        <span className={styles['token']}>Your Token No</span>
      </div>
      <div className={styles['separator']} />
      <div className={styles['count-container']}>
        <span className={styles['count']}>
          <Loading isLoading={!token.tokenNumber}>{token.tokenNumber}</Loading>
        </span>
      </div>
    </div>
  );
};
