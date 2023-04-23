const User = require("../models/User");
const bcrypt = require("bcrypt");
const authController = require("./api/authController");

// This function logs in a user and returns a JWT token
async function login(email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Incorrect password");
    }

    const token = authController.generateToken(user.id);
    return {
      user,
      token,
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  login,
};
