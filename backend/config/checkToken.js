const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token =
    req.headers["authorization"] || req.headers["Authorization"] || "";
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  console.log("Token value:", token); // Add this line to log the token value
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized",
        error: err,
      });
    } else {
      console.log("Decoded userId:", decoded.userId); // add this line to log the decoded userId
      req.userId = decoded.userId;
      next();
    }
  });
};
