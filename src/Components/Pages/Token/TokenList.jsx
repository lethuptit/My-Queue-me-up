import React from 'react';
import Loading from '../../common/Loading/Loading';
// import { useSelector } from 'react-redux';
// import { selectTokens } from 'store/selectedQueue';
// import Container from 'react-bootstrap/Container';

import { QrCode } from '../../common/Popup/QrCode';
import Token from './Token';
import styles from './Token.module.scss';



const EmptyTokenList = ({ queueName }) => {
  return (
    <>
      <p>
        Your line is currently empty. Add people to the line or share the
        below QR code to your users.
      </p>
      <QrCode tourTag="reactour__printQRCode" queueName={queueName} />
    </>
  );
};

const TokenList = ({ queue, title }) => {
  // const tokens = useSelector(selectTokens);
  let tokens = queue.tokens;
  // tokens=undefined;
  const selectTokens = queue.tokens;

  const ListContent = () =>
    tokens.length === 0 ? (
      <EmptyTokenList queueName={queue.queueName} />) :
      (tokens.map((token) => <Token token={token} key={token.tokenId} />)
    );

  return (
    <>
      {/* <Loading isLoading={tokens === undefined}> */}
      <div className={styles['token-list-contaner']}>
        <h3>Users In Queue</h3>
        {/* <ul> */}
        <ListContent className={styles['token-list']} />
        {/* </ul> */}
      </div>

      {/* </Loading> */}
    </>
  );
};

export default TokenList;
