import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createBlog } from "../api/blogs";

function BlogForm() {
  const history = useHistory();
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await createBlog(blog);
      history.push("/blogs");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Add New Blog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={blog.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={blog.content}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={blog.author}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
}

export default BlogForm;
