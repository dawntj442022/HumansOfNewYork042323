const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const authController = require("../api/authController");

// Route for creating a new user
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate a JWT token for the new user
    const token = authController.generateToken(newUser._id);

    // Return the new user and token as the response
    return res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to create user" });
  }
});

// Route for logging in a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the specified email address
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the provided password matches the user's hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Generate a JWT token for the user
    const token = authController.generateToken(user._id);

    // Return the user and token as the response
    return res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to login user" });
  }
});

module.exports = router;
