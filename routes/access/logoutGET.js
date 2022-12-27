const express = require("express");
const router = express.Router();

router.get("/logout", function (req, res) {
  res.cookie("token", { expires: Date.now() });
  res.redirect("/access");
});

module.exports = router;
