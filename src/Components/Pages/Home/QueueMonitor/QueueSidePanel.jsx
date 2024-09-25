import React from 'react';
import {SidePanel} from '../../../common/SidePanel';
import QueueInfoPanel from '../../../common/QueueInfo/QueueInfo';
import AddMember from './AddMember';
import PauseQueue from './PauseQueue';

 function QueueSidePanel({ queueInfo, isAdmin = true, onTogglePauseQueue, onAddGuest }) {
  return (
    <SidePanel>
      <QueueInfoPanel queueInfo={queueInfo} isAdmin={isAdmin}/>
      {isAdmin ? (
        <>
          {queueInfo.status==='Active'&&<AddMember queueInfo={queueInfo} onAddGuest={onAddGuest}/>}
          <PauseQueue queueId={queueInfo.queueId} queueStatus={queueInfo.status} />
        </>)
        : <></>}
    </SidePanel>
  )
};
export default QueueSidePanel;