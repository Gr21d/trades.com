"use client"
import React, { useState } from 'react';
import '../Blog/BlogPage.css';


const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [editingId, setEditingId] = useState(null);
    const [editPost, setEditPost] = useState({ title: '', content: '' });
    const [newPostError, setNewPostError] = useState({ title: false, content: false });
    const [commentError, setCommentError] = useState({});

const handleAddPost = () => {

  if (!newPost.title.trim() || !newPost.content.trim()) {
      setNewPostError({
          title: !newPost.title.trim(),
          content: !newPost.content.trim(),
      });
      return;
  }

  const post = { ...newPost, id: Date.now(), comments: [] };
  setPosts([...posts, post]);
  setNewPost({ title: '', content: '' });
  setNewPostError({ title: false, content: false });
};
  
  //delete Post
const handleDeletePost = (postId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this post?");
    if (isConfirmed) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };
  const handleAddComment = (postId, commentText) => {
    if (!commentText.trim()) {
        setCommentError({ ...commentError, [postId]: true });
        return;
    }

    setPosts(posts.map(post => {
        if (post.id === postId) {
            const comment = { id: Date.now(), text: commentText };
            return { ...post, comments: [...post.comments, comment] };
        }
        return post;
    }));

    setCommentError({ ...commentError, [postId]: false });
};
  const handleDeleteComment = (postId, commentId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const updatedComments = post.comments.filter(comment => comment.id !== commentId);
        return { ...post, comments: updatedComments };
      }
      return post;
    }));
  };
  const handleEditPost = () => {
    setPosts(posts.map(post => post.id === editingId ? { ...post, ...editPost } : post));
    setEditingId(null);
    setEditPost({ title: '', content: '' });
  };

  const handleStartEditing = (post) => {
    setEditingId(post.id);
    setEditPost({ title: post.title, content: post.content });
  };

  return (
    <div className='BlogArea'>
        <div className="NewPost">
            <h2 className="TitleBlog">Add a New Post</h2>
            <input
                className={`PostInput ${newPostError.title ? 'inputError' : ''}`}
                type="text"
                placeholder="Title"
                value={newPost.title}
                onChange={(e) => {
                    setNewPost({ ...newPost, title: e.target.value });
                    if (newPostError.title) setNewPostError({ ...newPostError, title: false });
                }}
            />
            <textarea
                className={`PostTextarea ${newPostError.content ? 'inputError' : ''}`}
                placeholder="Content"
                value={newPost.content}
                onChange={(e) => {
                    setNewPost({ ...newPost, content: e.target.value });
                    if (newPostError.content) setNewPostError({ ...newPostError, content: false });
                }}
            /> 
            <button className="PostButton" onClick={handleAddPost}>Add Post</button>
        </div>
        {editingId && (
            <div className="EditPost">
                <h2 className="TitleBlog">Edit Post</h2>
                <input
                    className="EditInput"
                    type="text"
                    placeholder="Title"
                    value={editPost.title}
                    onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                />
                <textarea
                    className="EditTextarea"
                    placeholder="Content"
                    value={editPost.content}
                    onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
                />
                <button className="EditButton" onClick={handleEditPost}>Save Changes</button>
            </div>
        )}
        <div className="PostsContainer">
            <h2 className="PostsTitle">Posts</h2>
            <div className='single-post-container'>
                {posts.map((post) => (
                <article key={post.id} className="PostArticle">
                    <h3 className="PostTitle">{post.title}</h3>
                    <p className="PostContent">{post.content}</p>
                    {post.comments.map((comment) => (
                     <div key={comment.id} className="CommentSection">
                        <p className="CommentText">{comment.text}</p>
                        <button className="DeleteCommentButton" onClick={() => handleDeleteComment(post.id, comment.id)}>Delete Comment</button>
                    </div>
                    ))}
                <button className="EditPostButton" onClick={() => handleStartEditing(post)}>Edit</button>
                <button className="DeletePostButton" onClick={() => handleDeletePost(post.id)}>Delete</button>
                <input
                    className="AddCommentInput"
                    type="text"
                    placeholder="Add a comment"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value) {
                            handleAddComment(post.id, e.target.value);
                            e.target.value = '';
                        }
                    }}
                />
                
            </article>
            
            
        ))}
            </div>
        </div>
    </div>
);

};

export default BlogPage;