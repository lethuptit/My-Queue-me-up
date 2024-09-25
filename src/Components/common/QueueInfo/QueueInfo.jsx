import React from 'react';
import QueueInfoDetails from './QueueInfoDetails';
import SidePanelItem from '../SidePanel/SidePanelItem';
import InfoIcon from '@mui/icons-material/Info';

function QueueInfoPanel({queueInfo, expendable, isAdmin}){

  return (
    <SidePanelItem
      Icon={InfoIcon}
      title="Queue Information"
      description={queueInfo.name}
      expendable ={expendable}
    >
      <QueueInfoDetails queueInfo={queueInfo} isAdmin={isAdmin}/>
    </SidePanelItem>
  );
};

export default QueueInfoPanel;
