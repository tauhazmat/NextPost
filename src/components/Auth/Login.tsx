'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import Navbar from '../Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [signInWithEmailAndPassword, userCredential, loading, error] =
    useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (userCredential) {
      router.push('/');
    }
  }, [userCredential, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error('Login failed', err);
      alert('Login failed');
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
      
      <form onSubmit={handleLogin} style={formStyle}>
        <h2 style={headingStyle}>Login</h2>
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
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p style={errorStyle}>{error.message}</p>}
        <p style={{ marginTop: '20px', color: '#777' }}>
          Not a user? 😕🤷‍♀️{' '}
          <a href="/signup" style={linkStyle}>
            Sign up here
          </a>
        </p>
      </form>
    </div>
    </>
  );
};

export default Login;
