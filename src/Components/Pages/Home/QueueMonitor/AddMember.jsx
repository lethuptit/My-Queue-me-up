import React from 'react';
import JoinQueueForm from '../../../common/JoinForm/JoinForm';
import SidePanelItem from '../../../common/SidePanel/SidePanelItem';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import styles from './QueueMonitor.module.scss';

function AddMember({ queueInfo, onAddGuest }) {
  return (
    <SidePanelItem
      // Icon="bi bi-person-plus-fill"
      Icon={PersonAddIcon}
      title="Add Member"
      description="Add guest manually"
      expandable
    >
      <div className={styles['join-queue-form']}>
        <JoinQueueForm isAdmin={true} queueId={queueInfo.queueId} queueInfo={queueInfo} onAddGuest={onAddGuest}/>
      </div>
    </SidePanelItem>
  );
};

export default AddMember;