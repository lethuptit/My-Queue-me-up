import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from '../../../FirebaseConfig';
import { ref, set } from 'firebase/database';
import { auth, db } from '../../../FirebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import { StandardButton } from '../../common/Button';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const validateEmail = (email) => {
      // Regular expression for email validation
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    const handleSignUp = async (e) => {
      e.preventDefault();

      if (!validateEmail(email)) {
        setEmailError('* Invalid email format');
        return;
      }
  
      if (password.length < 6) {
        setPasswordError('* Password must be at least 6 characters long');
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert("Your account has been created!");
        await set(ref(db, 'users/' + user.uid), {
          name: name,
          phone: phone,
          email: email
        });
        navigate('/login');
      } catch (error) {
        console.error('Error signing up:', error.message);
        if (error.code === 'auth/email-already-in-use') {
          setEmailError("* Email is already in use");
        } else {
          console.error("Sign up failed", error);
        }
      }
    };
    return (
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSignUp} id="form-validation">
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input data-cypress-name="cy_emailinput" 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p data-cypress-name="cy_emailerrormsg"
            className="error-message" id="invalid-email">{emailError}</p>
          <input  data-cypress-name="cy_passwordinput" 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p data-cypress-name="cy_passworderrormsg"
            className="error-message" id="invalid-password">{passwordError}</p>
          <StandardButton data-cypress-name="cy_submitbtn" type="submit" outlined>Sign Up</StandardButton>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    );
  }
  export default SignUp;







