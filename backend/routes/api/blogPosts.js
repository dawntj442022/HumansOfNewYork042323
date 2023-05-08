const express = require("express");
const router = express.Router();

const blogPostsController = require("../../controllers/api/blogPostsController");
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const checkToken = require("../../config/checkToken");

// Route to get all blog posts
router.get("/", function (req, res) {
  blogPostsController.getAll(req, res);
});

// Route to get one blog post by ID
router.get("/:id", function (req, res) {
  blogPostsController.getOne(req, res);
});

// Route to create a new blog post
router.post("/", function (req, res) {
  checkToken(req, res, function () {
    ensureLoggedIn(req, res, function () {
      // Check if user has permission to create a new blog post
      if (req.user.role !== "admin" && req.user.role !== "editor") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      // User has permission, proceed with creating the blog post
      blogPostsController.create(req, res);
    });
  });
});

// Route to update an existing blog post by ID
router.put("/:id", function (req, res) {
  checkToken(req, res, function () {
    ensureLoggedIn(req, res, function () {
      blogPostsController.update(req, res);
    });
  });
});

// Route to delete a blog post by ID
router.delete("/:id", function (req, res) {
  checkToken(req, res, function () {
    ensureLoggedIn(req, res, function () {
      blogPostsController.remove(req, res);
    });
  });
});

module.exports = router;
