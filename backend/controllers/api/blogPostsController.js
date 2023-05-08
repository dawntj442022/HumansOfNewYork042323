const BlogPost = require("../../models/blogPost");

const create = async (req, res) => {
  try {
    const { body } = req;
    const blogPost = await BlogPost.create({ ...body });
    res.status(201).json(blogPost);
  } catch (error) {
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
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updatedBlogPost) {
      res.status(404).json({ message: "Blog post not found" });
    } else {
      res.status(200).json(updatedBlogPost);
    }
  } catch (error) {
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

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};

//   async like(req, res) {
//     try {
//       const blogPost = await BlogPost.findById(req.params.id);
//       if (!blogPost) {
//         res.status(404).json({ message: "Blog post not found." });
//       } else {
//         const { isLiked } = blogPost.likes.find(
//           (like) => like.user.toString() === req.user._id.toString()
//         ) || { isLiked: false };
//         blogPost.likes = blogPost.likes.filter(
//           (like) => like.user.toString() !== req.user._id.toString()
//         );
//         if (!isLiked) {
//           blogPost.likes.push({ user: ObjectID(req.user._id), isLiked: true });
//         }
//         const savedPost = await blogPost.save();
//         res.json(savedPost);
//       }
//     } catch (error) {
//       res.status(500).json({ message: "Error liking blog post." });
//     }
//   },
// };
// const blogPostsController = require("../../controllers/api/blogPostsController");
// const ensureLoggedIn = require("../../config/ensureLoggedIn");
// const checkToken = require("../../config/checkToken");
