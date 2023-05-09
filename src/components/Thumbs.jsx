import React, { useState } from "react";

const Thumbs = ({ postId, likes, dislikes, handleLike, handleDislike }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLikeClick = () => {
    if (!liked) {
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
          handleLike(data._id, data.likes);
          setLiked(true);
          setDisliked(false);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleDislikeClick = () => {
    if (!disliked) {
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
          handleDislike(data._id, data.dislikes);
          setDisliked(true);
          setLiked(false);
        })
        .catch((err) => console.error(err));
    }
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
