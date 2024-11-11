'use client';

import { useState } from 'react';
import { auth } from '@/firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Navbar from '../Navbar';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User created successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f1f4f8',
    fontFamily: "'Roboto', sans-serif",
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
    backgroundColor: 'white',
    textAlign: 'center',
  };

  const inputStyle = {
    padding: '12px',
    margin: '12px 0',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '15px',
    transition: 'border-color 0.3s',
  };

  const buttonStyle = {
    padding: '12px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '10px',
  };

  const linkStyle = {
    color: '#007BFF',
    textDecoration: 'none',
  };

  const headingStyle = {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  };

  const errorStyle = {
    color: 'red',
    fontSize: '14px',
    marginTop: '10px',
  };

  return (
    <>
    <Navbar />
    <div style={containerStyle}>
      <form onSubmit={(e) => e.preventDefault()} style={formStyle}>
        <h2 style={headingStyle}>Sign Up</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={inputStyle}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={inputStyle}
        />
        <button type="submit" onClick={handleSignUp} style={buttonStyle}>
          Sign Up
        </button>
        {password.length > 0 && password.length < 6 && (
          <p style={errorStyle}>Password should be at least 6 characters long</p>
        )}
        <p style={{ marginTop: '20px', color: '#777' }}>
          Already a user? 😊{' '}
          <a href="/login" style={linkStyle}>
            Login here
          </a>
        </p>
      </form>
    </div>
    </>
  );
};

export default SignUp;
