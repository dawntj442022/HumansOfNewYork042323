import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getBlogByIdApi, updateBlogApi } from "../api/blogs";
import BlogForm from "./BlogForm";

function EditBlogForm() {
  const { id } = useParams();
  const history = useHistory();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const blog = await getBlogByIdApi(id);
      setBlog(blog);
    }
    fetchData();
  }, [id]);

  async function handleSubmit(updatedBlog) {
    try {
      await updateBlogApi(id, updatedBlog);
      history.push(`/blogs/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {blog ? (
        <div>
          <h2>Edit Blog</h2>
          <BlogForm initialValues={blog} handleSubmit={handleSubmit} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EditBlogForm;
