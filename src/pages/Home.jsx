import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Post from "../components/Post";
import Thumbs from "../components/Thumbs";
import { useUserStore } from "../store";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/blogPosts");
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleLike = (postId, isLiked) => {
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          dislikes: isLiked ? post.dislikes + 1 : post.dislikes - 1,
          liked: !isLiked,
          disliked: isLiked ? false : post.disliked,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

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

  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  const handleEdit = async (postId, updatedPost) => {
    const token = localStorage.getItem("token");
    console.log(token);
    // console.log("Before fetch");
    const res = await fetch(`/api/blogPosts/${postId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedPost),
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
      <Navigation user={user} onLogout={handleLogout} />
      <div className="container">
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
                liked={post.liked}
                disliked={post.disliked}
                likes={post.likes}
                dislikes={post.dislikes}
                handleLike={handleLike}
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
