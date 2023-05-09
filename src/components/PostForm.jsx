import React, { useState, useEffect } from "react";

const PostForm = ({ post, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
