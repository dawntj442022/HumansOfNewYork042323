import React, { useState } from "react";

const Thumbs = ({ postId, handleLike, handleDislike }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLikeClick = () => {
    if (!liked) {
      handleLike(postId);
      setLiked(true);
      setDisliked(false);
    }
  };

  const handleDislikeClick = () => {
    if (!disliked) {
      handleDislike(postId);
      setDisliked(true);
      setLiked(false);
    }
  };

  return (
    <div>
      <button onClick={handleLikeClick}>
        <span role="img" aria-label="thumbs-up">
          👍
        </span>
      </button>
      <span>{/* display number of likes */}</span>
      <button onClick={handleDislikeClick}>
        <span role="img" aria-label="thumbs-down">
          👎
        </span>
      </button>
      <span>{/* display number of dislikes */}</span>
    </div>
  );
};

export default Thumbs;
