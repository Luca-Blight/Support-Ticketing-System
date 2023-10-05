import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/login/',
        {},
        {
          auth: {
            username,
            password,
          },
        }
      );
      if (response.data.status === 'Logged in successfully!') {
        onLoginSuccess();
      } else {
        setError('Login failed');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };
  <h1 className='ticket-form-title'>Ticket Form</h1>

  return (
    <div className='loginForm'>
      <h1 className='login-form-title'>Admin Login</h1>
      <div>
        <input
          className='login-email'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Email'
        />
        <input 
          className='login-password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button
          className='login-button'
          onClick={handleLogin}>
          Login
        </button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
