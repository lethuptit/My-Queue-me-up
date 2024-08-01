import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import PauseIcon from '@material-ui/icons/Pause';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SidePanelItem from '../../../common/SidePanel/SidePanelItem';
// import { useSetQueueStatus } from 'store/asyncActions/setQueueStatus';
// import { selectQueueStatus } from 'store/selectedQueue';
import {queueInfo} from '../../../../__mocks__/data';

export default ({ queueId }) => {
  // const dispatch = useDispatch();
  // const setQueueStatus = useSetQueueStatus();
  // const queueStatus = useSelector(selectQueueStatus);
  const queueStatus = queueInfo.status;
  
  const activeDescription = 'Temporarily stop people from joining';
  const pausedDescription = 'Start allowing people to join the queue';
  let paused = queueStatus === 'PAUSED';
  // paused = 'PAUSED';

  const toggleQueueStatus = () => {
    const status = paused ? 'ACTIVE' : 'PAUSED';

    //Request server to set queue status...Need implementing
  };

  const iconPause = "bi bi-pause-circle";
  const iconPlay = "bi bi-play-circle";

  return (
    <SidePanelItem
      Icon={paused ? iconPlay : iconPause}
      title={paused ? 'Resume Queue' : 'Pause Queue'}
      description={paused ? pausedDescription : activeDescription}
      onClick={toggleQueueStatus}
      style={paused ? 'side-panel-item-selected' : 'side-panel-item'}
    />
  );
};
