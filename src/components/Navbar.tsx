'use client';

import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { text } from 'stream/consumers';

const Navbar = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const navStyle = {
    backgroundColor: '#1a1a1a',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const ulStyle = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  };

  const logoStyle = {
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginRight: 'auto',
    textDecoration: 'none',
    cursor: 'pointer',
  };

  const liStyle = {
    fontSize: '1rem',
    fontWeight: '500',
  };

  const userEmailStyle = {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#ffffff',
    textDecoration: 'none',
    padding: '0.5rem 0.8rem',
    transition: 'color 0.3s',
    textAlign: 'center',
  }

  const linkStyle = {
    color: '#ffffff',
    textDecoration: 'none',
    padding: '0.5rem 0.8rem',
    transition: 'color 0.3s',
  };

  const buttonStyle = {
    backgroundColor: '#ff6347',
    color: '#ffffff',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    borderRadius: '6px',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#e5533f',
  };

  return (
    <nav style={navStyle}>
      <Link href="/" style={logoStyle}>NextPost</Link>
      <ul style={ulStyle}>
        <li style={userEmailStyle}>
        {user?.email}
        </li>
        <li style={liStyle}>
          <Link href="/" style={linkStyle}>Home</Link>
        </li>
        {user ? (
          <>
            <li style={liStyle}>
              <Link href="/add-blog" style={linkStyle}>Create Blog</Link>
            </li>
            <li style={liStyle}>
              <button
                onClick={handleSignOut}
                style={buttonStyle}
                onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
              >
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li style={liStyle}>
              <Link href="/login" style={linkStyle}>Login</Link>
            </li>
            <li style={liStyle}>
              <Link href="/signup" style={linkStyle}>Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
