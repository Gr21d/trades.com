'use client';
import { useEffect, useState, useRef } from "react";
import { Blog, User } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
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
  const isFetching = useRef(false); //prevent multiple fetches

  const fetchBlogs = async () => {
    if (isFetching.current) return; // Prevent multiple concurrent requests
    isFetching.current = true;
    try {
      const skip = (page - 1) * PostPerPage;
      const response = await fetch(`./viewBlogs/api/fetchBlogs?limit=${PostPerPage}&skip=${skip}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBlogs((prevBlogs) => [...prevBlogs, ...data]);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      isFetching.current = false;
    }
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
  




  return (
    <div>
      <h1>Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog.id}>
          {editingBlogId === blog.id ? (
            <>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              ></textarea>
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
              <p>Author: {blog.author.user.username}</p>
              <p>Blog posted At: {new Date(blog.datePosted).toLocaleDateString()} {new Date(blog.datePosted).toLocaleTimeString()}</p>
              {(blog.author.user.adminId !== null || currentId === blog.author.user.id) && (
                <div>
                  <button onClick={() => handleEdit(blog.id)}>Edit</button>
                  <button onClick={() => handleDelete(blog.id)}>Delete</button>
                </div>
              )}
              <div>
                <h3>Comments</h3>
                {blog.comments.map((comment) => (
                  <div key={comment.id}>
                    <p>{comment.content}</p>
                    <p>By: {comment.author.username}</p>
                    <p>At: {new Date(comment.datePosted).toLocaleDateString()} {new Date(comment.datePosted).toLocaleTimeString()}</p>
                    {(comment.authorId === currentId || blog.author.user.adminId !== null) && (
                      <button onClick={() => handleDeleteComment(comment.id, blog.id)}>Delete Comment</button>
                    )}
                  </div>
                ))}
                {showCommentInput[blog.id] ? (
                  <div>
                    <input
                      type="text"
                      value={commentInput[blog.id] || ""}
                      onChange={(e) => handleCommentInputChange(blog.id, e.target.value)}
                    />
                    <button onClick={() => handlePostComment(blog.id)}>Post Comment</button>
                  </div>
                ) : (
                  <button onClick={() => setShowCommentInput((prevState) => ({ ...prevState, [blog.id]: true }))}>
                    Add Comment
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      ))}
      <button onClick={() => setPage((prevPage) => prevPage + 1)}>Load More</button>
    </div>
  );
  };


export default BlogsPage;