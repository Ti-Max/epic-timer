const jwt = require("jsonwebtoken");

const unVerifyToken = (req, res, next) => {
  const authHeader = req.headers.cookie;
  const token = authHeader && authHeader.split("=")[1];

  if (token == null) {
    return next();
  }
  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) return next();

    return res.redirect("./");
  });
};

module.exports = unVerifyToken;
