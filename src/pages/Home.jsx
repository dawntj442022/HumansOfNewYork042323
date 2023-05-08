import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Post from "../components/Post";
import Thumbs from "../components/Thumbs";

const Home = () => {
  const [posts, setPosts] = useState([]);

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

  const handleDelete = (postId) => {
    fetch(`/api/blogPosts/${postId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedPosts = posts.filter((post) => post._id !== data._id);
        setPosts(updatedPosts);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (postId, updatedPost) => {
    fetch(`/api/blogPosts/${postId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedPosts = posts.map((post) => {
          if (post._id === data._id) {
            return data;
          }
          return post;
        });
        setPosts(updatedPosts);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navigation />
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
