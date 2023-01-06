const express = require("express");
const router = express.Router();

// database
const getSolvesfromCategory =
  require("./access/userActionsDB.js").getSolvesfromCategory;

/* GET home page. */
router.get("/", async function (req, res) {
  // Get solves from database
  const solves = await getSolvesfromCategory(req.user_id, "overall");

  res.render("index", {
    userdata: {
      username: req.username,
      solves: solves,
    },
  });
});

module.exports = router;
