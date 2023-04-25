import create from "zustand";
import { devtools } from "zustand/middleware";

const useBlogsStore = create(
  devtools((set) => ({
    blogs: [],
    setBlogs: (blogs) => set({ blogs }),
    updateBlog: (updatedBlog) =>
      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog
        ),
      })),
    deleteBlog: (blogId) =>
      set((state) => ({
        blogs: state.blogs.filter((blog) => blog._id !== blogId),
      })),
  }))
);

export default useBlogsStore;
