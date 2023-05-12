import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useUserStore } from "../store";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import videoSource from "../images/White simple photo album mobile video.mp4";

const UserPage = () => {
  const [posts, setPosts] = useState([]);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const { id } = useParams();
  const user = useUserStore((state) => state.user);

  const history = useHistory();

  console.log("User ID in user page:", user?._id);

  const fetchUserPosts = useCallback(async () => {
    try {
      console.log("Fetching user posts...");
      const res = await fetch(`/api/blogPosts/author/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      } else {
        history.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, history]);

  useEffect(() => {
    console.log("User ID:", user?._id);
    if (user && user._id === id) {
      fetchUserPosts();
    }
  }, [user, fetchUserPosts, id]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await fetch("/api/blogPosts");
  //     const data = await res.json();
  //     setPosts(data);
  //   };

  //   fetchPosts();
  // }, [user, fetchUserPosts]);

  const handleCreatePost = async (newPost) => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const res = await fetch("/api/blogPosts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });
      if (res.ok) {
        const data = await res.json();
        setPosts([...posts, data.post]);
        setIsCreatingPost(false);
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to create post. Please try again.");
    }
  };
  const handleEditPost = async (postId, updatedPost) => {
    console.log(
      "Editing post with ID:",
      postId,
      " and updated data:",
      updatedPost
    );

    // Check if postId is defined
    if (!postId) {
      console.log("The post ID is not defined!");
      return;
    }

    const token = localStorage.getItem("token");
    console.log("Token:", token);

    try {
      console.log("Sending updated post:", updatedPost);
      const res = await fetch(`http://localhost:3001/api/blogPosts/${postId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: updatedPost.title,
          content: updatedPost.content,
        }),
      });

      if (!res.ok) {
        console.error("Error status code:", res.status);
        console.error("Error status text:", res.statusText);
        const errorData = await res.text(); // Using .text() if expecting a non-JSON response
        console.error("Error data:", errorData);
        throw new Error("Failed to edit the post");
      }

      const data = await res.json();
      console.log("Successfully updated post:", data);

      // Updating the specific post in the state
      const updatedPosts = posts.map((post) =>
        post._id === postId ? data : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error while editing post:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem("token");
    console.log(token);
    const res = await fetch(`/api/blogPosts/${postId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: null,
    });
    if (res.ok) {
      setPosts(posts.filter((post) => post._id !== postId));
    } else {
      alert("Unable to delete post. Please try again.");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container userpage-container">
      <video autoPlay="autoplay" loop="loop" muted className="video-background">
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h1 className="text-center mt-5">{user.username} Blog</h1>
      {user._id === id && (
        <button onClick={() => setIsCreatingPost(true)}>Create Post</button>
      )}
      {isCreatingPost && <PostForm post={null} onSubmit={handleCreatePost} />}
      <hr />
      <div className="row">
        {posts
          .filter((post) => post !== undefined) // Add this line to filter out undefined posts
          .map((post) => (
            <div className="col-md-6" key={post._id}>
              <Post
                post={post}
                onEdit={(updatedPost) => handleEditPost(post._id, updatedPost)}
                onDelete={() => handleDeletePost(post._id)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserPage;
