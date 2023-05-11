import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import Thumbs from "../components/Thumbs";
import { useUserStore } from "../store";
import Navigation from "../components/Navigation";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const handleLogout = () => {
    console.log("Before logout token:", localStorage.getItem("token"));
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    console.log("Token value:", localStorage.getItem("token"));
    const fetchPosts = async () => {
      const res = await fetch("/api/blogPosts");
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    const token = localStorage.getItem("token");
    console.log(token);
    const res = await fetch(`/api/blogPosts/${postId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: null,
    });
    console.log(res.status);
    if (res.ok) {
      setPosts(posts.filter((post) => post._id !== postId));
    } else {
      alert("Unable to delete post. Please try again.");
    }
  };

  const handleEdit = async (postId, updatedPost) => {
    const token = localStorage.getItem("token");
    console.log(token);
    const res = await fetch(`http://localhost:3001/api/blogPosts/${postId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: updatedPost.title,
        content: updatedPost.content,
      }),
    });
    console.log(res.status);
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      const updatedPosts = posts.map((post) =>
        post._id === data._id ? data : post
      );
      setPosts(updatedPosts);
      console.log(updatedPost);
    } else {
      alert("Unable to update post. Please try again.");
    }
  };

  return (
    <>
      {user && <Navigation user={user} onLogout={handleLogout} />}
      <div className="container homepage-container">
        <h1 className="text-center mt-5">All Posts</h1>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id}>
              <Post
                post={post}
                onDelete={() => handleDelete(post._id)}
                onEdit={(updatedPost) => handleEdit(post._id, updatedPost)}
              />
              <Thumbs
                postId={post._id}
                initialLikes={post.likes.length}
                initialDislikes={post.dislikes.length}
              />
            </div>
          ))
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
    </>
  );
};

export default Home;
