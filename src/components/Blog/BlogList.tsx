"use client";

import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: { seconds: number; nanoseconds: number };
  userEmail: string;
}

const blogContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'center',
  padding: '20px',
};

const postStyle = {
  width: '300px',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  backgroundColor: '#fff',
  textAlign: 'left',
  cursor: 'pointer',
};

const blogheading = {
  color: '#333',
  fontSize: '22px',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const blogDescription = {
  color: '#666',
  fontSize: '15px',
  lineHeight: '1.6',
};

const smallText = {
  fontSize: '12px',
  color: '#999',
  marginTop: '15px',
};

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const blogsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Blog[];
      setBlogs(blogsData);
    });

    return unsubscribe;
  }, []);

  return (
    <div style={blogContainer}>
      {blogs.map((blog) => (
        <div 
          style={{
            ...postStyle,
            ':hover': { 
              transform: 'scale(1.05)',
              boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
            },
          }}
          key={blog.id}
        >
          <p style={smallText}>Posted by: {blog.userEmail}</p>
          <h3 style={blogheading}>{blog.title}</h3>
          <p style={blogDescription}>{blog.content}</p>
          <small style={smallText}>Posted At: {new Date(blog.createdAt.seconds * 1000).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
