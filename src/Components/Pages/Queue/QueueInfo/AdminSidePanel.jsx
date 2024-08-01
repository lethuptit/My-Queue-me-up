import React from 'react';
import SidePanel from '../../../common/SidePanel';
import QueueInfoPanel from './QueueInfoPanel';
import AddMember from './AddMember';
import QueueSettings from './QueueSettings';
import QueueHistoryPanel from './QueueHistoryPanel';
import PauseQueue from './PauseQueue';
import QueueHeader from './QueueViewHeader';

export default ({ queueId, queueName }) => (
  <SidePanel>
    {/* <QueueHeader queueId={queueId} queueName={queueName}/> */}
    <QueueInfoPanel queueId={queueId} />
    <AddMember queueId={queueId} />
    <PauseQueue queueId={queueId} />
    <QueueSettings queueId={queueId} />
    {/* <QueueHistoryPanel queueId={queueId} /> */}
  </SidePanel>
);
