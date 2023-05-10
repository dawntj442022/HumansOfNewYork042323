import React, { useState } from "react";

const Thumbs = ({ postId }) => {
  console.log("Post ID value:", postId);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

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
        setLikes(data.likes);
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
        setDislikes(data.dislikes);
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
      <span>{likes}</span>
      <button onClick={handleDislikeClick}>
        <span role="img" aria-label="thumbs-down">
          👎
        </span>
      </button>
      <span>{dislikes}</span>
    </div>
  );
};

export default Thumbs;
