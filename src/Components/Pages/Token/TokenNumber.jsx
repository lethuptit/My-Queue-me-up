import Loading from '../../common/Loading/Loading';
import React from 'react';
// import { selectToken } from 'store/token';
import { createdToken, queueInfo } from '../../../__mocks__/data';

import styles from './Token.module.scss';

export default () => {
  // const token = useSelector(selectToken);
  const token = createdToken;

  return (
    <div className={styles['token-number-container']}>
      <div className={styles['count-container']}>
        <span>Your Postion</span>
        <span className={styles['count']}>
          <Loading isLoading={!token.tokenNumber}>{token.tokenNumber}</Loading>
        </span>
      </div>

      {/* <ul className="queue-view-list">
        {queue.slice(0, 20).map((guest, index) => (
          <li key={guest.key} className="queue-view-item">
            {index + 1}. {guest.name}
          </li>
        ))}
      </ul>
       */}
    </div>
  );
};
