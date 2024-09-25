import React from 'react';
import { signOut } from '../../../FirebaseConfig';
import { auth } from '../../../FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
function Signout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('hostId')
      // navigate('/login');
      navigate('/')
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };
  return (
    <div>
      <LandingPage/>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
export default Signout;
