import React, { useState } from 'react';
import { signInWithEmailAndPassword } from '../../../FirebaseConfig';
import { auth } from '../../../FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './Auth.css';
import { StandardButton } from '../../common/Button';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('hostId',email)
        // localStorage.removeItem('guestId')
        navigate('/dashboard');
      } catch (error) {
        
        setErrorMessage('Incorrect email or password. Please try again.'); 

        console.error('Error logging in:', error.message);
      }
    };
    return (
      <div className="auth-container">
        <h5>If you're host, please log in.</h5><br></br>
        <form className="auth-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StandardButton type="submit">Login</StandardButton>

          {errorMessage && ( // Conditionally render the error message
          <p className="error-message">{errorMessage}</p>
        )}

          <p>
            Don't have an account? <Link to="/signup">Create account</Link>
          </p>
        </form>
      </div>
    );
  }
  export default Login;