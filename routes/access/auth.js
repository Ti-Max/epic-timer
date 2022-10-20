const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.cookie;
  const token = authHeader && authHeader.split("=")[1];

  if (token == null) {
    return res.redirect("./access");
  }
  jwt.verify(token, process.env.TOKEN_KEY, (err, userinfo) => {
    if (err) return res.redirect("./access");

    req.username = userinfo.username;
    req.user_id = userinfo.user_id;
    
    return next();
  });
};

module.exports = verifyToken;
