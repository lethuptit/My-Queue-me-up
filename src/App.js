// src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JoinQueue from './Pages/Queue/JoinQueue';
import Dashboard from './Pages/Dashboard/Dashboard';
import QueueView from './Pages/Queue/QueueView';
import Notification from './Components/Notification/Notification';

import Navbar from './Components/common/Nav/Navbar';

import './App.css'; // Create a CSS file for styling

const App = () => {
  const [userId, setUserId] = useState(() => {
    let storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      storedUserId = `user-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('userId', storedUserId);
    }
    return storedUserId;
  });

  

  const handleHostButtonClick = () => {
    setShowPasswordInput(true);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsHost(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" index element={HomePage} />
          <Route path="/queue-view" element={<QueueView />} />
          {/* <Route path="/queue/:queueId" exact component={AdminPage} /> */}
          {/* <Route path="/j/:queueName" exact component={JoinQueueWithDetails} /> */}
          {/* <Route path="/token/:tokenId" exact component={TokenStatusPage} /> */}
          {/* <Route path="/privacy" exact component={TermsOfService} /> */}
          {/* <Route path="/scanQr" exact component={QrScanner} /> */}
          {/* <Route path="/pageNotFound/queueName=:queueName" exact component={PageNotFound} /> */}
          {/* <Route component={PageNotFound} /> */}
        </Routes>
      </BrowserRouter>
      {/* <PopupNotifications /> */}
    </>
  )
    // <Router>
    //   <div className="app-container">
    //     <Nav/>        
    //     <Routes>
    //       <Route path="/" element={
    //         <div> 
    //           {!isHost && (
    //             <>
    //               <button onClick={handleHostButtonClick} className="host-button">
    //                 Are you a host for this event?
    //               </button>
    //               {showPasswordInput && (
    //                 <form onSubmit={handlePasswordSubmit} className="password-form">
    //                   <input
    //                     type="password"
    //                     placeholder="Enter password"
    //                     value={password}
    //                     onChange={(e) => setPassword(e.target.value)}
    //                     className="password-input"
    //                     required
    //                   />
    //                   <button type="submit" className="submit-button">Submit</button>
    //                 </form>
    //               )}
    //               {/* <JoinQueue userId={userId} /> */}
    //             </>
    //           )}
    //           {isHost && <Dashboard />}
    //           {userId && <Notification userId={userId} />}
    //         </div>
    //       } />
    //       <Route path="/queue-view" element={<QueueView />} />
    //     </Routes>
    //   </div>
    // </Router>
  
};

export default App;
