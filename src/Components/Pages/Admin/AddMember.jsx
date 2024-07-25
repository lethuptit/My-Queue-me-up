import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import JoinQueueForm from '../Join/JoinForm';
import SidePanelItem from '../../common/SidePanel/SidePanelItem';
import styles from './admin.module.scss';

export default ({ queueId }) => {
  return (
    <SidePanelItem
      Icon={AddIcon}
      title="Add Member"
      description="Add a person to this queue manually"
      expandable
      tourTag="reactour__addMember"
    >
      <div className={styles['admin-join-queue-form']}>
        <JoinQueueForm buttonText="Add To Queue" isAdminPage queueId={queueId} />
      </div>
    </SidePanelItem>
  );
};
