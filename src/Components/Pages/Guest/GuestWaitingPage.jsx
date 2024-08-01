
import React, { useEffect, useCallback } from 'react';
import QueueHeader from '../Queue/QueueInfo/QueueViewHeader';
import styles from './GuestPage.module.scss';
import TokenStatus from '../Token/TokenStatus';
import TokenNumber from '../Token/TokenNumber';
import { useParams } from 'react-router';
import {createdToken} from '../../../__mocks__/data';
import { Container, Col } from 'react-bootstrap';
import QueueInfoPanel from '../Queue/QueueInfo/QueueInfoPanel';

function TokenStatusPage(props) {
  // const tokenId = props.match.params.tokenId;
  const {tokenId} = useParams();
  // const token = useSelector(selectToken);
  const token = createdToken;
  // const getToken = useCallback(useGetToken(), []);

  // useEffect(() => {
  //   dispatch(getToken({ tokenId, refresh: true }));
  // }, [tokenId, dispatch, getToken]);

  return (
    <div className={styles['main-container']}>
      <QueueHeader queueName={token ? token.queueName : 'Loading...'} subTitle="Test"/>
      <Container className={styles['main-body']}>
        <Col md={3} xs={11}>
        <TokenNumber />
        </Col>
        <Col md={6} xs={11}>
        <TokenStatus />
        </Col>
        <Col md={3} xs={11}>
        <QueueInfoPanel expendable={false}/> 
        </Col>      
      </Container>
    </div>
  );
}

export default TokenStatusPage;
