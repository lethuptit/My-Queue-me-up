import React, { useEffect, useCallback } from 'react';
import QueueInfo from './QueueInfo';
import SidePanelItem from '../../../common/SidePanel/SidePanelItem';

import {createdToken as token, queueInfo as mockQueueInfo} from '../../../../__mocks__/data';

function QueueInfoPanel({queueId, expendable}){

  function getQueueInfo(queueId){
    //Need call server

    //testing
    return mockQueueInfo;
  }

  // const queueInfo = (selectQueueInfo);
  const queueInfo = getQueueInfo(queueId);
  // useEffect(() => {
  //  queueInfo = getQueueInfo(queueId);
  //   }
  // }, [queueId]);

  return (
    <SidePanelItem
      Icon="bi bi-info-circle-fill"
      title="Queue Information"
      description="Queue details"
      expendable ={expendable}
    >
      <QueueInfo queueInfo={queueInfo} />
    </SidePanelItem>
  );
};

export default QueueInfoPanel;
