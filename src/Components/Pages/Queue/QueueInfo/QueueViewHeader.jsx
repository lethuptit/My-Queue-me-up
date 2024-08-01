import React, { useState, useCallback } from 'react';
import HeaderSection from '../../../common/HeaderSection';
import RefreshIcon from '@material-ui/icons/Refresh';
import StandardButton from '../../../common/Button';
import styles from './QueueAdmin.module.scss';

const AdminHeaderSection = ({ description, queueName }) => {  

  const handleRefreshClick = () => {
    //(getSelectedQueue({ queueId }));
    //(getSelectedQueueHistory({ queueId }));
  };

  
  return (
    <div className={styles['queue-header']}>
      <HeaderSection className={styles['header']} queueName={queueName} subTitle={description}/>
      <div className={styles['main-button-group']}>        
        <div className={styles['admin-button']}>
          <StandardButton onClick={handleRefreshClick} icon={<RefreshIcon />} outlined>
            Refresh
          </StandardButton>
        </div>
      </div>
    </div>
  );
};

export default AdminHeaderSection;
