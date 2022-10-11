const express = require("express");
const router = express.Router();
const unauth = require("./unauth");

router.get("/logout", function (req, res, next) {
  res.cookie("token", { expires: Date.now() });
  res.redirect("/access");
});

module.exports = router;
