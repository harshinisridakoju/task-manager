const protect = (req, res, next) => {
  console.log("User Authenticated");
  next();
};

module.exports = protect;