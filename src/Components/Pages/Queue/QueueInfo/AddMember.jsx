import React from 'react';
import JoinQueueForm from '../../Join/JoinForm';
import SidePanelItem from '../../../common/SidePanel/SidePanelItem';
import styles from './QueueAdmin.module.scss';

export default ({ queueId }) => {
  return (
    <SidePanelItem
      Icon="bi bi-person-plus-fill"
      title="Add Member"
      description="Add guest manually"
      expandable
    >
      <div className={styles['admin-join-queue-form']}>
        <JoinQueueForm buttonText="Add To Queue" isAdminPage queueId={queueId} />
      </div>
    </SidePanelItem>
  );
};
