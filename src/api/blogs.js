import axios from "axios";

const BASE_URL = "http://localhost:3001/api/blogs";

export async function getBlogsApi() {
  const response = await axios.get(BASE_URL);
  return response.data;
}

export async function createBlog(blog) {
  const response = await axios.post(BASE_URL, blog);
  return response.data;
}

export async function updateBlogApi(id, blog) {
  const response = await axios.put(`${BASE_URL}/${id}`, blog);
  return response.data;
}

export async function deleteBlog(id) {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
}

export async function getBlogByIdApi(id) {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
}
