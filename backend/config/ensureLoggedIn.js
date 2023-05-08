module.exports = (req, res, next) => {
  if (!res.locals.data.userId) return res.status(401).json("Unauthorized");
  next();
};
