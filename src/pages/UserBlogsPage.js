import React, { useEffect } from "react";
import BlogList from "../components/BlogList";
import { useAuthContext } from "../contexts/authContext";
import { useBlogsContext } from "../contexts/blogsContext";

function UserBlogsPage() {
  const { user } = useAuthContext();
  const { blogs, fetchBlogsByUserId, deleteBlog } = useBlogsContext();

  useEffect(() => {
    if (user) {
      fetchBlogsByUserId(user._id);
    }
  }, [user, fetchBlogsByUserId]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      await deleteBlog(id);
    }
  };

  return (
    <div>
      <h2>Your Blogs</h2>
      {blogs.length === 0 ? (
        <p>You haven't written any blogs yet.</p>
      ) : (
        <BlogList
          blogs={blogs}
          renderActions={(blog) =>
            blog.author._id === user._id && (
              <div>
                <button onClick={() => handleDelete(blog._id)}>Delete</button>
                <button>Edit</button>
              </div>
            )
          }
        />
      )}
    </div>
  );
}

export default UserBlogsPage;
