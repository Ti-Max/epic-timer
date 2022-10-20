const colors = require("../css/colors.js");

const express = require("express");
const router = express.Router();

// database
const getSolvesfromCategory =
  require("./access/userActionsDB.js").getSolvesfromCategory;

/* GET home page. */
router.get("/", async function (req, res, next) {
  // Get solves from database
  const result = await getSolvesfromCategory(req.user_id, "overall");
  const solves = [];
  for (let i = 0; i < result.length; i++) {
    const solve = result[i];
    solves.push({ time: solve.time, id: result.length - i });
  }

  res.render("index", {
    username: req.username,
    solves: solves,
    colors: colors,
  });
});

module.exports = router;
