import React, { useState, useEffect } from 'react';
// import { smoothScrollToHomePageTop } from 'utils/scrollingOperations';
// import { BenefitsInfo, HowToCreate, HowToJoin, ExtraInfo, Pricing } from './StaticInfos';

function LoginPage() {

    const [userId, setUserId] = useState(() => {
        let storedUserId = localStorage.getItem('userId');
        if (!storedUserId) {
            storedUserId = `user-${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('userId', storedUserId);
        }
        return storedUserId;
    });


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

    return (
        <>
            <div>
                {/* <button onClick={handleHostButtonClick} className="host-button">
                    Are you a host for this event?
                </button> */}
                
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
                
            </div>
        </>
    )
}


export default LoginPage;