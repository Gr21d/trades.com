/**
 * The `AddPostForm` component in React allows users to add a new post with a title and content,
 * handling form submission and displaying success or error messages.
 * @returns The `AddPostForm` component is being returned. It is a functional component in React that
 * displays a form for adding a new post. The form includes input fields for title and content, a
 * submit button to add the post, and a message section to display success or error messages. The
 * component also handles form submission by making a POST request to the specified API endpoint to add
 * the post.
 */
"use client"
import React, { useState } from 'react';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action

    // Assuming you store your JWT in localStorage or cookies
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Log the token

    if (!token) {
      setMessage('Please sign in to add a post.');
      return;
    }
  

    try {
      {console.log(process.cwd())}
      const response = await fetch('../Blog/api/addPost', { // Update the API endpoint path
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
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
    <div>
      <h2>Add a New Post</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPostForm;