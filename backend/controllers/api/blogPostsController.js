const BlogPost = require("../../models/blogPost");

const create = async (req, res) => {
  try {
    const { body } = req;
    console.log(body);
    const blogPost = await BlogPost.create({
      ...body,
      author: res.locals.data.userId,
    });
    res.status(201).json(blogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const getAll = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find({});
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await BlogPost.findOne({ _id: id });
    if (!blogPost) {
      res.status(404).json({ message: "Blog post not found" });
    } else {
      res.status(200).json(blogPost);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    console.log("request payload:", body);

    console.log("Updating blog post with ID:", id);

    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      console.log("Blog post not found");
      res.status(404).json({ message: "Blog post not found" });
      return;
    }

    if (blogPost.author.toString() !== res.locals.data.userId) {
      res
        .status(403)
        .json({ message: "You are not authorized to update this post" });
      return;
    }
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(id, body, {
      new: true,
    });

    console.log("Updated blog post:", updatedBlogPost);

    if (!updatedBlogPost) {
      console.log("Blog post not found after update");
      res.status(404).json({ message: "Blog post not found" });
    } else {
      res.status(200).json({ post: updatedBlogPost });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlogPost = await BlogPost.findByIdAndDelete(id);
    if (!deletedBlogPost) {
      res.status(404).json({ message: "Blog post not found" });
    } else {
      res.status(200).json(deletedBlogPost);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
const { ObjectID } = require("mongodb");
const like = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      res.status(404).json({ message: "Blog post not found." });
    } else {
      const { isLiked } = blogPost.likes.find(
        (like) => like.user.toString() === req.user._id.toString()
      ) || { isLiked: false };
      blogPost.likes = blogPost.likes.filter(
        (like) => like.user.toString() !== req.user._id.toString()
      );
      if (!isLiked) {
        blogPost.likes.push({ user: ObjectID(req.user._id), isLiked: true });
      }
      const savedPost = await blogPost.save();
      res.json(savedPost);
    }
  } catch (error) {
    res.status(500).json({ message: "Error liking blog post." });
  }
};
const dislike = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      res.status(404).json({ message: "Blog post not found." });
    } else {
      const { isDisliked } = blogPost.likes.find(
        (like) => like.user.toString() === req.user._id.toString()
      ) || { isDisliked: false };
      blogPost.likes = blogPost.likes.filter(
        (like) => like.user.toString() !== req.user._id.toString()
      );
      if (!isDisliked) {
        blogPost.likes.push({ user: ObjectID(req.user._id), isDisliked: true });
      }
      const savedPost = await blogPost.save();
      res.json(savedPost);
    }
  } catch (error) {
    res.status(500).json({ message: "Error disliking blog post." });
  }
};
const getByAuthor = async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const blogPosts = await BlogPost.find({ author: authorId });
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: "Error getting posts by author", error });
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  like,
  dislike,
  getByAuthor,
};

// const blogPostsController = require("../../controllers/api/blogPostsController");
// const ensureLoggedIn = require("../../config/ensureLoggedIn");
// const checkToken = require("../../config/checkToken");
