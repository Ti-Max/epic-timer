const express = require("express");
const router = express.Router();

router.get("/cubein3d", async function (req, res, next) {

  res.render("cubein3d");
});

module.exports = router;
