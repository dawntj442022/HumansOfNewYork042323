const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await authController.login(email, password);
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to log in" });
  }
});

module.exports = router;
