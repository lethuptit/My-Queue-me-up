import React, { useEffect } from 'react';
import { smoothScrollToHomePageTop } from 'utils/scrollingOperations';
import { BenefitsInfo, HowToCreate, HowToJoin, ExtraInfo, Pricing } from './StaticInfos';
import LandingPage from './LandingPage';

const HomePage = () => {
  // Scroll to top whenever home page is mounted
  // useEffect(smoothScrollToHomePageTop, []);

  const [isHost, setIsHost] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const correctPassword = 'host123'; // Hardcoded password for demonstration

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
  return 
    {!isHost && (
      <>
        <button onClick={handleHostButtonClick} className="host-button">
          Are you a host for this event?
        </button>
        {showPasswordInput && (
          <form onSubmit={handlePasswordSubmit} className="password-form">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
              required
            />
            <button type="submit" className="submit-button">Submit</button>
          </form>
        )}
        {/* <JoinQueue userId={userId} /> */}
      </>
    )}
    };
    {isHost && <Dashboard />}

export default HomePage;
