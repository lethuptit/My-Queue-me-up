import React from 'react';
import SidePanel from '../../common/SidePanel';
import QueueDetails from '../Queue/QueueInfo';
import NotificationContainer from './NotificationContainer';

export default () => (
  <SidePanel>
    <QueueDetails />
    <NotificationContainer />
  </SidePanel>
);
