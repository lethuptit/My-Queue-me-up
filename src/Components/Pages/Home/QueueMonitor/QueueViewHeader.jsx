import React, { useState } from 'react';
import HeaderSection from '../../../common/Header/HeaderSection';
import styles from './QueueMonitor.module.scss';
import QueueList from './QueueList';

const AdminHeaderSection = ({ title, subTitle, onRefresh, onChangeQueue }) => {

  const handleRefreshClick = () => {
    onRefresh(prev => !prev);
  };

  const hostId = localStorage.getItem("hostId")

  
  return (    
    <div className={styles['queue-header']}>
      <HeaderSection className={styles['header']} title={title} >
      </HeaderSection>
      <div>
        <QueueList onChange={onChangeQueue}/>
      </div>
    </div>
  );
};

export default AdminHeaderSection;
