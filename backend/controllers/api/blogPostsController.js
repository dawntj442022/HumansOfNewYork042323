const express = require("express");
const router = express.Router();
const blogPostsController = require("../../controllers/api/blogPostsController");

// Read all
router.get("/", async (req, res) => {
  try {
    const blogPosts = await blogPostsController.find();
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Read one
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = await blogPostsController.findOne(id);
    return res.json(query);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Create
router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const createdBlogPost = await blogPostsController.create({ ...body });
    return res.json(createdBlogPost);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Received PUT request for BlogPost with ID", id);
  try {
    const updatedBlogPost = await blogPostsController.update(id, req.body);
    console.log("Successfully updated BlogPost with ID", id);
    return res.json(updatedBlogPost);
  } catch (error) {
    console.log("Error updating BlogPost with ID", id, ":", error);
    res.status(500).json({ error });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deletedBlogPost = await blogPostsController.delete(id);
    return res.json(deletedBlogPost);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;

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
