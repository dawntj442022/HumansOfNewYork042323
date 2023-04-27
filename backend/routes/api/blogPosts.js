const express = require("express");
const router = express.Router();
const blogPostsController = require("../../controllers/api/blogPostsController");
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const checkToken = require("../../config/checkToken");

router.get("/", blogPostsController.getAll);
router.get("/:id", blogPostsController.getOne);
router.post("/", checkToken, ensureLoggedIn, blogPostsController.create);
router.put("/:id", checkToken, ensureLoggedIn, blogPostsController.update);
router.delete("/:id", checkToken, ensureLoggedIn, blogPostsController.delete);

module.exports = router;
