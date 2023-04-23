const express = require("express");
const router = express.Router();
const Blog = require("../../models/blog");
const checkToken = require("../../checkToken");

// Read all
router.get("/", async (req, res) => {
  try {
    const query = await Blog.find({});
    return res.json(query);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Read one
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = await Blog.findOne({ _id: id });
    return res.json(query);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Create
router.post("/", checkToken, async (req, res) => {
  try {
    const { body } = req;
    const createdBlog = await Blog.create({ ...body });
    return res.json(createdBlog);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Update
router.put("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  console.log("Received PUT request for Blog with ID", id);
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log("Successfully updated blog with ID", id);
    return res.json(updatedBlog);
  } catch (error) {
    console.log("Error updating blog with ID", id, ":", error);
    res.status(500).json({ error });
  }
});

// Delete
router.delete("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    return res.json(deletedBlog);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
