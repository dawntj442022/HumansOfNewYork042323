import React, { useState, useEffect } from "react";

const PostForm = ({ post, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = post ? { ...post, title, content } : { title, content };
    console.log("submitting updated post:", updatedPost);
    onSubmit(updatedPost);
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
          onChange={(e) => {
            console.log("Content:", e.target.value);
            setContent(e.target.value);
          }}
        ></textarea>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
