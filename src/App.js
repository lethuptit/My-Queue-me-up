// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import HomePage from './Pages/Home/HomePage';
import QueueView from './Pages/Queue/QueueView';
import Navbar from './Components/common/Nav/Navbar';

import './App.css'; // Create a CSS file for styling
import LoginPage from './Pages/Login/LoginPage';
import ContactPage from './Pages/Contact/ContactPage';
import LandingPage from './Pages/Home/LandingPage';

const App = () => {

  return (
    <>    
      <Navbar />
        <Routes>
          <Route path="/" index element={<LandingPage/>} />
          <Route path="/queue-view" element={<QueueView />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* <Route path="/queue/:queueId" exact component={AdminPage} /> */}
          {/* <Route path="/j/:queueName" exact component={JoinQueueWithDetails} /> */}
          {/* <Route path="/token/:tokenId" exact component={TokenStatusPage} /> */}
          {/* <Route path="/privacy" exact component={TermsOfService} /> */}
          {/* <Route path="/scanQr" exact component={QrScanner} /> */}
          {/* <Route path="/pageNotFound/queueName=:queueName" exact component={PageNotFound} /> */}
          {/* <Route component={PageNotFound} /> */}
        </Routes>
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
