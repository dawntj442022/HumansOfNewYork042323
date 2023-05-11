import React, { useState } from "react";

const Thumbs = ({ postId, initialLikes = 0, initialDisLikes = 0 }) => {
  console.log("Post ID value:", postId);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [dislikesCount, setDislikesCount] = useState(initialDisLikes);

  const handleLikeClick = () => {
    const token = localStorage.getItem("token");
    console.log("Token value:", token);
    fetch(`/api/blogPosts/${postId}/like`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Update the post's likes count
        setLikesCount(data.likesCount);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDislikeClick = () => {
    const token = localStorage.getItem("token");
    console.log("Token value:", token);
    fetch(`/api/blogPosts/${postId}/dislike`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Update the post's dislikes count
        setDislikesCount(data.dislikesCount);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <button onClick={handleLikeClick}>
        <span role="img" aria-label="thumbs-up">
          👍
        </span>
      </button>
      <span>{likesCount}</span>
      <button onClick={handleDislikeClick}>
        <span role="img" aria-label="thumbs-down">
          👎
        </span>
      </button>
      <span>{dislikesCount}</span>
    </div>
  );
};

export default Thumbs;
