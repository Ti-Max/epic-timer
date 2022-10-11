const express = require("express");
const router = express.Router();
const unauth = require("../access/unauth");

/* GET access page. */
router.get("/access", unauth, function (req, res, next) {
  res.render("access");
});

module.exports = router;
