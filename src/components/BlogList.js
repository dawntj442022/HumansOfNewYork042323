import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBlogContext } from "../contexts/BlogContext";

function BlogListPage() {
  const { blogs, getBlogs } = useBlogContext();

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/blogs/new">Create New Blog</Link>
    </div>
  );
}

export default BlogListPage;
