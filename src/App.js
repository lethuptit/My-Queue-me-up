// src/App.js
import React, {useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppProvider } from './Context';

import QueueView from './Components/Pages/Queue/QueueView';
import Navbar from './Components/common/Nav/Navbar';
import JoinQueue from './Components/Pages/Join/JoinPage';
import './App.css'; // Create a CSS file for styling
import LoginPage from './Components/Pages/Login/LoginPage';
import ContactPage from './Components/Pages/Contact/ContactPage';
import LandingPage from './Components/Pages/Home/LandingPage';
import TokenStatusPage from './Components/Pages/TokenStatus/TokenStatusPage'
import AdminPage from './Components/Pages/Admin/AdminPage';
import QrScanner from './Components/common/QrScanner/QrScanner';
import UserPage from './Components/Pages/Home/GuestPage'
import PopupNotifications from './Components/common/Popup';
import Footer from './Components/common/Footer/Footer'
import Header from './Components/common/Header/StandardHeader'
import BackToTopButton from './Components/common/TopButton/Back2TopButton';
 
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./FirebaseConfig";

import { toast, ToastContainer } from "react-toastify";
import Message from "./Message";



  

const App = () => {
  const [isVisibleTopBUtton, SetisVisibleTopBUtton] = useState(false);
  const VITE_APP_VAPID_KEY = 'BLi0R3iCOpI916s8NPQNf3J2NgfA5ZcacLvxZNFUtB_53CU2hpJFAf-QmP2kuDW6EPvofg0_pluFaJcnifocE-E';

  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY,
      });

      //We can send token to server
      console.log("Token generated : ", token);
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }
    const toggleBacktotop = () => {
      if (window.scrollY > 10) {
        // backtotop.classList.add('active')
        SetisVisibleTopBUtton(true)
      } else {
        // backtotop.classList.remove('active')
        SetisVisibleTopBUtton(false)

      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  
    onMessage(messaging, (payload) => {
      console.log('message')
      toast(<Message notification={payload.notification} />);
    });

  return (
    <AppProvider>
      <Header/>
      <Routes>
        <Route path="/" index element={<LandingPage />} />
        <Route path="/guest" index element={<UserPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/queue/:queueId" element={<AdminPage />} />
        <Route path="/j/:queueName" element={<JoinQueue />} />
        <Route path="/token/:tokenId" element={<TokenStatusPage />} />
        <Route path="/scanQr" element={<QrScanner />} />
        {/* <Route path="/pageNotFound/queueName=:queueName" exact component={PageNotFound} /> */}
        {/* <Route component={PageNotFound} /> */}
      </Routes>
      <Footer/>
      <BackToTopButton visible={isVisibleTopBUtton}/>
      <PopupNotifications />
    </AppProvider>
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
