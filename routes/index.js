const colors = require("../css/colors.js");

const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { user: req.user, colors: colors });
});

module.exports = router;
