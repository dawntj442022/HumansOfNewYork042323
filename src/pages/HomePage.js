import { useBlogsContext } from "../contexts/blogsContext";

const HomePage = () => {
  const { blogs, deleteBlog } = useBlogsContext();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      await deleteBlog(id);
    }
  };

  return (
    <div>
      <h1>All Blog Posts</h1>
      {blogs.map((blog) => (
        <div key={blog._id} style={{ marginBottom: "20px" }}>
          <h2>{blog.title}</h2>
          <p>
            <strong>Author: </strong> {blog.author.name}
          </p>
          <p>{blog.content}</p>
          {blog.author._id === localStorage.getItem("userId") && (
            <div>
              <button onClick={() => handleDelete(blog._id)}>Delete</button>
              <button>Edit</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
