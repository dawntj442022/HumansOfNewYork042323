import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getAllBlogs = async () => {
  const response = await axios.get(`${API_URL}/api/blogs`);
  return response.data;
};

const createBlog = async (blogData) => {
  const response = await axios.post(`${API_URL}/api/blogs`, blogData);
  return response.data;
};

const getBlogById = async (id) => {
  const response = await axios.get(`${API_URL}/api/blogs/${id}`);
  return response.data;
};

const updateBlog = async (id, blogData) => {
  const response = await axios.put(`${API_URL}/api/blogs/${id}`, blogData);
  return response.data;
};

const deleteBlog = async (id) => {
  await axios.delete(`${API_URL}/api/blogs/${id}`);
};

export { getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog };
