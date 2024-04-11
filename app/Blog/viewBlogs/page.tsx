'use client';
import Link from 'next/link';
import { useEffect, useState, useRef } from "react";
import { Blog, User } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import "./styles/BlogPage.css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { comment } from "postcss";

interface DecodedToken extends JwtPayload {
  userId: number;
}



interface Comment {
  user: any;
  id: number;
  content: string;
  authorId: number;
  blogId: number;
  author: User;
  datePosted: Date;
}

interface BlogWithAuthorAndComments extends Blog {
  author: {
    user: User;
  };
  comments: Comment[];
}

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<BlogWithAuthorAndComments[]>([]);
  const [commentInput, setCommentInput] = useState<{ [blogId: number]: string }>({});
  const [showCommentInput, setShowCommentInput] = useState<{ [blogId: number]: boolean }>({});
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [page, setPage] = useState(1);
  const PostPerPage = 2;
  const [totalBlogsCount, setTotalBlogsCount] = useState(0);
  const isFetching = useRef(false); //prevent multiple fetches

  const fetchBlogs = async () => {
    if (isFetching.current) return;
    isFetching.current = true;
  
    try {
      const skip = (page - 1) * PostPerPage;
      const response = await fetch(`./viewBlogs/api/fetchBlogs?limit=${PostPerPage}&skip=${skip}`, {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { blogs, totalBlogsCount } = await response.json(); // Destructure the response to get blogs and totalBlogsCount
      setBlogs(blogs);
      setTotalBlogsCount(totalBlogsCount);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      isFetching.current = false;
    }
  };
  

  const handleNextPage = () => {
    setPage((currentPage) => currentPage + 1);
    window.scrollTo(0, 0);
  };
  const handlePreviousPage = () => {
    setPage((currentPage) => Math.max(currentPage - 1, 1)); // Prevent going below page 1
    window.scrollTo(0, 0);
  };  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.decode(token) as DecodedToken;
      setCurrentId(decodedToken.userId);
    }

    fetchBlogs();
  }, [page]);

  const handleEdit = async (blogId: number) => {
    try {
      // Fetch the current blog data
      const response = await fetch(`viewBlogs/api/fetchBlogs?id=${blogId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blogData = await response.json();

      // Set the editing blog ID and populate the form fields
      setEditingBlogId(blogId);
      setEditedTitle(blogData.title);
      setEditedContent(blogData.content);
    } catch (error) {
      console.error('Error editing blog:', error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      // Send a PUT request to update the blog
      const updateResponse = await fetch(`viewBlogs/api/deleteBlogs?id=${editingBlogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editedTitle, content: editedContent }),
      });

      if (!updateResponse.ok) {
        throw new Error(`HTTP error! status: ${updateResponse.status}`);
      }

      // Clear the editing state and refetch the blogs
      setEditingBlogId(null);
      setEditedTitle("");
      setEditedContent("");
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingBlogId(null);
    setEditedTitle("");
    setEditedContent("");
  };

  const handleDelete = async (blogId: number) => {
    try {
      await fetch(`viewBlogs/api/deleteBlogs?id=${blogId}`, {
        method: "DELETE",
      });
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleCommentInputChange = (blogId: number, value: string) => {
    setCommentInput((prevState) => ({
      ...prevState,
      [blogId]: value,
    }));
  };
  
  const handlePostComment = async (blogId: number) => {
    try {
      const response = await fetch(`viewBlogs/api/postComment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: commentInput[blogId],
          authorId: currentId,
          blogId,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      setCommentInput((prevState) => ({
        ...prevState,
        [blogId]: "",
      }));
      setShowCommentInput((prevState) => ({
        ...prevState,
        [blogId]: false,
      }));
      fetchBlogs();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };
  const handleDeleteComment = async (commentId: number, blogId: number) => {
    try {
      const response = await fetch(`viewBlogs/api/deleteComment`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentId: commentId,
          userId: currentId,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  const totalPages = Math.ceil(totalBlogsCount / PostPerPage);
  const hasNextPage = page < totalPages;



  return (
    <body>
      <Header type="blog"/>
    <div className="blog-container">
      <h1 className="blog-header">BLOGS</h1>
      <a href="postBlog" className="view-all-btn">+</a>
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-post">
          {editingBlogId === blog.id ? (
            <div className="blog-editing">
              <input
                type="text"
                className="blog-edit-title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                className="blog-edit-content"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              ></textarea>
              <button className="blog-save-edit" onClick={handleSaveEdit}>Save</button>
              <button className="blog-cancel-edit" onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <>
            <div className='All-Blog-Post'>
              <h2 className="blog-title">{blog.title}</h2>
              <p className="blog-content">{blog.content}</p>
              <p className="blog-author">Author: {blog.author.user.username}</p>
              <p className="blog-date">Blog posted At: {new Date(blog.datePosted).toLocaleDateString()} {new Date(blog.datePosted).toLocaleTimeString()}</p>
              {(blog.author.user.adminId !== null || currentId === blog.author.user.id) && (
                <div className="blog-actions">
                  <button className="blog-edit-button" onClick={() => handleEdit(blog.id)}>Edit</button>
                  <button className="blog-delete-button" onClick={() => handleDelete(blog.id)}>Delete</button>
                </div>
              )}</div>
              <div className="blog-comments">
                <h3>Comments</h3>
                {blog.comments.map((comment) => (
                  <div key={comment.id} className="blog-comment">
                    <p className="comment-content">{comment.content}</p>
                    <p className="comment-author">By: {comment.author.username}</p>
                    <p className="comment-date">At: {new Date(comment.datePosted).toLocaleDateString()} {new Date(comment.datePosted).toLocaleTimeString()}</p>
                    {(comment.authorId === currentId || blog.author.user.adminId !== null) && (
                      <button className="comment-delete-button" onClick={() => handleDeleteComment(comment.id, blog.id)}>Delete Comment</button>
                    )}
                  </div>
                ))}
                {showCommentInput[blog.id] ? (
                  <div className="comment-input-area">
                    <input
                      type="text"
                      className="comment-input"
                      value={commentInput[blog.id] || ""}
                      onChange={(e) => handleCommentInputChange(blog.id, e.target.value)}
                    />
                    <button className="comment-post-button" onClick={() => handlePostComment(blog.id)}>Post Comment</button>
                  </div>
                ) : (
                  <button className="comment-add-button" onClick={() => setShowCommentInput((prevState) => ({ ...prevState, [blog.id]: true }))}>
                    Add Comment
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      ))}
      <div className="blog-navigation">
        <button className="page-previous-button" onClick={handlePreviousPage} disabled={page === 1}>Previous Page</button>
        <button className="page-next-button" onClick={handleNextPage} disabled={!hasNextPage}>Next Page</button>
      </div>
    </div>
    <Footer/>
    </body>
  );
  };  


export default BlogsPage;