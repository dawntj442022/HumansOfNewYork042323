import React from "react";
import { Link } from "react-router-dom";
import { useBlogsContext } from "../contexts/blogsContext";
import axios from "axios";

function Blog({ blog }) {
  const { blogs, updateBlog } = useBlogsContext();

  const handleLike = async () => {
    try {
      const response = await axios.patch(`/api/blogs/${blog._id}`, {
        likes: blog.likes + 1,
      });
      updateBlog(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>
        <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
      </h3>
      <p>{blog.content}</p>
      {blog.imageUrl && (
        <img src={blog.imageUrl} alt="Blog post" width="300" height="200" />
      )}
      {blog.videoUrl && (
        <iframe
          title="Blog post"
          width="300"
          height="200"
          src={blog.videoUrl}
        ></iframe>
      )}
      <p>
        Likes: {blog.likes}{" "}
        <button onClick={handleLike}>
          <span role="img" aria-label="Thumbs up">
            👍
          </span>
        </button>
      </p>
      <p>
        <Link to={`/users/${blog.user._id}`}>{blog.user.name}</Link>
      </p>
      {blogs.user && blog.user._id === blogs.user._id && (
        <div>
          <Link to={`/blogs/${blog._id}/edit`}>Edit</Link> |{" "}
          <Link to={`/blogs/${blog._id}/delete`}>Delete</Link>
        </div>
      )}
    </div>
  );
}

export default Blog;
