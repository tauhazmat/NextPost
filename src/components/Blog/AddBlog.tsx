'use client';

import { useState } from 'react';
import { db, auth } from '@/firebase/firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Navbar from '../Navbar';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleAddBlog = async () => {
    if (title === '' || content === '') {
      alert('Form field should not be empty.');
      return;
    }

    const userEmail = auth.currentUser ? auth.currentUser.email : null;

    if (auth.currentUser) {
      try {
        await addDoc(collection(db, 'blogs'), {
          title,
          content,
          createdAt: Timestamp.now().toDate(),
          userEmail,
        });
        alert('Blog post added!');
        router.push('/');
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert('You must be logged in to add a blog post.');
    }
  };

  // Styling for the component
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    margin: '2rem auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f7f7f7',
  };

  const inputStyle = {
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  };

  const textAreaStyle = {
    ...inputStyle,
    height: '150px',
    resize: 'vertical',
  };

  const buttonStyle = {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontSize: '1.8rem',
  };

  return (
    <>
    <Navbar />
    <div style={{ padding: '50px' }}>
      <h2 style={headingStyle}>Add Blog</h2>
      <form onSubmit={(e) => e.preventDefault()} style={formStyle}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={textAreaStyle}
        />
        <button
          onClick={handleAddBlog}
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
        >
          Add Blog
        </button>
      </form>
    </div>
    </>
  );
};

export default AddBlog;
