import React, { useState, useEffect } from 'react';
// import { smoothScrollToHomePageTop } from 'utils/scrollingOperations';
// import { BenefitsInfo, HowToCreate, HowToJoin, ExtraInfo, Pricing } from './StaticInfos';
import LandingPage from './LandingPage';
import Dashboard from '../Dashboard/Dashboard'
import JoinQueue from '../Queue/JoinQueue'
import Notification from '../../Components/Notification/Notification'

const HomePage = () => {
  // Scroll to top whenever home page is mounted
  // useEffect(smoothScrollToHomePageTop, []);
  const [isHost, setIsHost] = useState(false);
  const [userId, setUserId] = useState(() => {
    let storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
        storedUserId = `user-${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('userId', storedUserId);
    }
    return storedUserId;
});

  if (isHost)
    return <Dashboard />;
  
  return  <JoinQueue userId={userId} />;
}

export default HomePage;
