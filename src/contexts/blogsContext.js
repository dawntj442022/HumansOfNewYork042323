import { create } from "zustand";
import { useEffect } from "react";
import axios from "axios";
import React, { createContext, useState } from "react";

export const BlogsContext = createContext();

const useBlogs = create((set) => ({
  blogs: [],
  createBlog: async (blog) => {
    try {
      const response = await axios.post("/api/blogs", blog);
      set((state) => ({ blogs: [...state.blogs, response.data] }));
    } catch (error) {
      console.error(error);
    }
  },
  updateBlog: async (blog) => {
    try {
      const response = await axios.put(`/api/blogs/${blog._id}`, blog);
      set((state) => ({
        blogs: state.blogs.map((b) => (b._id === blog._id ? response.data : b)),
      }));
    } catch (error) {
      console.error(error);
    }
  },
  deleteBlog: async (blogId) => {
    try {
      await axios.delete(`/api/blogs/${blogId}`);
      set((state) => ({ blogs: state.blogs.filter((b) => b._id !== blogId) }));
    } catch (error) {
      console.error(error);
    }
  },
  fetchBlogs: async () => {
    try {
      const response = await axios.get("/api/blogs");
      set({ blogs: response.data });
    } catch (error) {
      console.error(error);
    }
  },
}));

export const useBlogsContext = () => useBlogs((state) => state);

export const BlogsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { blogs, createBlog, updateBlog, deleteBlog, fetchBlogs } =
    useBlogsContext();

  useEffect(() => {
    fetchBlogs().finally(() => setIsLoading(false));
  }, [fetchBlogs]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <BlogsContext.Provider
      value={{ blogs, createBlog, updateBlog, deleteBlog }}
    >
      {children}
    </BlogsContext.Provider>
  );
};
