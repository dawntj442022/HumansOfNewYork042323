const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const bcrypt = require("bcrypt");

/**
 * Generates a JWT token for the given user ID
 * @param {string} userId - The user ID to include in the token
 * @returns {string} - The JWT token
 */
function generateToken(userId) {
  const payload = { userId };
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

/**
 * Verifies a JWT token and returns the decoded payload
 * @param {string} token - The JWT token to verify
 * @returns {Object} - The decoded payload
 */
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

/**
 * Creates a new user with the given name, email, and password
 * @param {string} name - The name of the user
 * @param {string} email - The email address of the user
 * @param {string} password - The password of the user
 * @returns {Object} - The newly created user object
 */
async function createUser(name, email, password) {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
}

module.exports = {
  generateToken,
  verifyToken,
  createUser,
};
