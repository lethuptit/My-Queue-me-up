import React from 'react';
import Loading from '../../common/Loading/Loading';
// import { useSelector } from 'react-redux';
// import { selectTokens } from 'store/selectedQueue';
import { queue} from '../../../__mocks__/data';
import { QrCode } from '../../common/Popup/QrCode';
import Token from './Token';
import styles from './admin.module.scss';

const selectTokens = queue.tokens;
const EmptyTokenList = ({ queueName }) => {
  return (
    <>
      <p>
        Your line has been created and is currently empty. Add people to the line and share the
        below QR code for them to see their status
      </p>
      <QrCode tourTag="reactour__printQRCode" queueName={queueName} />
    </>
  );
};

const TokenList = ({ queueName }) => {
  // const tokens = useSelector(selectTokens);
  const tokens = queue.tokens;
  const ListContent = () =>
    tokens.length === 0 ? (
      <EmptyTokenList queueName={queueName} /> ) : 
      (tokens.map((token) => <Token token={token} key={token.tokenId} />)
    );

  return (
    <Loading isLoading={tokens === undefined}>
      <div className={styles['token-list']}>
        <ListContent />
      </div>
    </Loading>
  );
};

export default TokenList;
