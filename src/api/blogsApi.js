import axios from "axios";

const apiUrl = "/api/blogs";

export const getBlogs = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await axios.get(`${apiUrl}/${id}`);
  return response.data;
};

export const createBlog = async (blog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(apiUrl, blog, config);
  return response.data;
};

export const updateBlog = async (blog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(`${apiUrl}/${blog._id}`, blog, config);
  return response.data;
};

export const deleteBlog = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`${apiUrl}/${id}`, config);
  return response.data;
};
