const jwt = require("jsonwebtoken");

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

module.exports = {
  generateToken,
  verifyToken,
};
