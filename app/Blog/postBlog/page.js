
"use client"
import React, { useState } from 'react';
import Header from "../../components/header";
import Footer from "../../components/footer";
import "./styles/PostBlog.css";
const AddPostForm = () => {
  const [title, setTitle] = useState(''); // the title content 
  const [content, setContent] = useState(''); // the content 
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action

    // Assuming you store your JWT in localStorage or cookies
    const token = localStorage.getItem('token'); // need to decode 
    console.log('Token:', token); // Log the token

    if (!token) {
      setMessage('Please sign in to add a post.');
      return;
    }
  

    try {
      
      const response = await fetch('/Blog/postBlog/api/addPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setMessage('Post added successfully!');
      setTitle('');
      setContent('');
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to add the post.');
    }
  };
  return (
    <body><Header/>
      <div className='blog-area'>
      <h2>Add a New Post</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="add-post-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content" className="form-label">Content:</label>
          <textarea
            id="content"
            className="form-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Add Post</button>
        <a href="viewBlogs" className="view-all-btn">View All Blogs</a>
      </form>
      </div>
    <Footer/>
    </body>
  );
};

export default AddPostForm;