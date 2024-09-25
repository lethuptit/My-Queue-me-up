import React, { useEffect, useState } from 'react';
import SidePanelItem from '../../../common/SidePanel/SidePanelItem';
// import {queueInfo} from '../../../../__mocks__/data';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { ref, child, get, set, push, update, remove, onValue, onChildAdded, onChildChanged } from "firebase/database";
import { db, dbQueues } from '../../../../FirebaseConfig';

export default ({ queueId, queueStatus }) => {
  const [paused, setPaused] = useState(queueStatus === 'Paused')

  useEffect(()=>{
    setPaused(queueStatus === 'Paused')
  })

  const activeDescription = 'Temporarily stop joining';
  const pausedDescription = 'Start allowing to join';

  const handleToggleStatus =  () => {
    setPaused(!paused)



    // // Trigger queue status
    const queueRef = ref(db, `queues/${queueId}`);
    const status = paused===true?'Active':'Paused';
    update(queueRef, { status })
      .catch(err => {
        console.log("\tError with ", err.message)
      })


    // if(onTogglePause)
    //   onTogglePause(prev=>prev==='Paused'?'Active':'Paused')
  };

  const iconPause = "bi bi-pause-circle";
  const iconPlay = "bi bi-play-circle";

  return (
    <SidePanelItem
      Icon={paused ? PlayArrowIcon : PauseIcon}
      title={paused ? 'Resume Queue' : 'Pause Queue'}
      description={paused ? pausedDescription : activeDescription}
      onClick={handleToggleStatus}
      style={paused ? 'side-panel-item-selected' : 'side-panel-item'}
    />
  );
};
