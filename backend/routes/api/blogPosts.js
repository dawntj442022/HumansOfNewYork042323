const express = require("express");
const router = express.Router();

const blogPostsController = require("../../controllers/api/blogPostsController");
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const checkToken = require("../../config/checkToken");

// Route to get all blog posts
router.get("/", blogPostsController.getAll);

// Route to get one blog post by ID
router.get("/:id", blogPostsController.getOne);

// Route to create a new blog post
router.post(
  "/",
  checkToken,
  ensureLoggedIn,
  blogPostsController.create
  //   blogPostsController.addToUser
);

// Route to update an existing blog post by ID
router.put("/:id", checkToken, ensureLoggedIn, blogPostsController.update);
// Route to delete a blog post by ID
router.delete("/:id", checkToken, ensureLoggedIn, blogPostsController.remove);

module.exports = router;
