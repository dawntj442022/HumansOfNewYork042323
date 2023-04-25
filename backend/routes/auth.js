const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

// Signup route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // create a new user with the provided data
    const user = await authController.createUser(name, email, password);
    const token = authController.generateToken(user._id);
    res.json({
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to sign up" });
  }
});

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
