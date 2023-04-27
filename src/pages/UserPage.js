import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useUserStore } from "../store";
import Post from "../components/Post";
import PostForm from "../components/PostForm";

const UserPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = useParams();
  const user = useUserStore((state) => state.user);
  const history = useHistory();

  const handleCreatePost = async (newPost) => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newPost),
    });
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, data.post]);
      setIsCreating(false);
    } else {
      alert("Unable to create post. Please try again.");
    }
  };

  const handleEditPost = async (postId, updatedPost) => {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedPost),
    });
    if (res.ok) {
      const data = await res.json();
      const updatedPosts = posts.map((post) =>
        post._id === data.post._id ? data.post : post
      );
      setPosts(updatedPosts);
      setIsEditing(false);
    } else {
      alert("Unable to update post. Please try again.");
    }
  };

  const handleDeletePost = async (postId) => {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.ok) {
      setPosts(posts.filter((post) => post._id !== postId));
      setIsDeleting(false);
    } else {
      alert("Unable to delete post. Please try again.");
    }
  };

  const fetchUserPosts = useCallback(async () => {
    const res = await fetch(`/api/users/${id}/posts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      setPosts(data.posts);
      setIsLoading(false);
    } else {
      history.push("/login");
    }
  }, [id, history]);

  useEffect(() => {
    if (user) {
      fetchUserPosts();
    } else {
      history.push("/login");
    }
  }, [user, fetchUserPosts, history]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center mt-5">{user.username}'s Blog</h1>
      {isCreating ? (
        <PostForm
          onSubmit={handleCreatePost}
          onCancel={() => setIsCreating(false)}
        />
      ) : (
        <button onClick={() => setIsCreating(true)}>Create New Post</button>
      )}
      <hr />
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-6" key={post._id}>
            <Post
              post={post}
              onEdit={handleEditPost}
              onDelete={handleDeletePost}
              isEditing={isEditing === post._id}
              setIsEditing={setIsEditing}
              isDeleting={isDeleting === post._id}
              setIsDeleting={setIsDeleting}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
