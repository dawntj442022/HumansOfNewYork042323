import React from "react";
import useAuthStore from "../contexts/authContext";
import { deleteBlog } from "../services/blogs";

function UserProfile() {
  const user = useAuthStore((state) => state.user);
  const blogs = useAuthStore((state) => state.blogs);
  const setBlogs = useAuthStore((state) => state.setBlogs);

  const handleDeleteBlog = async (id) => {
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>{user.name}'s Profile</h2>
      <p>Email: {user.email}</p>
      <h3>Your Blogs</h3>
      {blogs
        .filter((blog) => blog.user._id === user._id)
        .map((blog) => (
          <div key={blog._id}>
            <h4>{blog.title}</h4>
            <p>{blog.content}</p>
            <button onClick={() => handleDeleteBlog(blog._id)}>
              Delete Blog
            </button>
          </div>
        ))}
    </div>
  );
}

export default UserProfile;
