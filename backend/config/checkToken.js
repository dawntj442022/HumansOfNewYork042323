const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token =
    req.headers["authorization"] || req.headers["Authorization"] || "";
  console.log(token);
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  console.log("Token value:", token); // Add this line to log the token value
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      if (err.name === "JsonWebTokenError") {
        // Token has an invalid signature
        return res.status(401).json({
          message: "Invalid token signature",
          error: err,
        });
      } else {
        // Some other error occurred
        return res.status(401).json({
          message: "Unauthorized",
          error: err,
        });
      }
    } else {
      console.log("Decoded userId:", decoded.userId); // add this line to log the decoded userId
      res.locals.data.userId = decoded.userId;
      next();
    }
  });
};
