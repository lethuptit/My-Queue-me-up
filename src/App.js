// // src/App.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css'; // Create a CSS file for styling
import Login from './Components/Pages/SignIn/Login';
import SignUp from './Components/Pages/SignIn/SignUp';
import LandingPage from './Components/Pages/LandingPage/LandingPage';
import GuestPage from './Components/Pages/Guest/GuestPage'
import GuestWaitingPage from './Components/Pages/Guest/GuestWaitingPage'
import Footer from './Components/common/Footer/Footer'
import { FixedHeader } from './Components/common/Header/StandardHeader'
import DashboardHome from './Components/Pages/Home/Home';

const App = () => {
  return (
    <>
      <FixedHeader />
      <div className={"container-fluid app-container"}>
        <Routes>
          <Route path="/" index element={<LandingPage />} />
          <Route path="/join" element={<GuestPage />} />
          <Route path="/join/:queueId" element={<GuestPage />} />
          <Route path="/join/token" element={<GuestWaitingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard/*" element={<DashboardHome />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        {/* <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 1440 220">
              <path
                fill="#6C63FF29"
                fillOpacity="1"
                d="M0,224L80,192C160,160,320,96,480,101.3C640,107,800,181,960,181.3C1120,181,1280,107,1360,69.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
              />
            </svg> */}
      </div>
      <Footer />
    </>
  )
};
export default App;