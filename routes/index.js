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
    const solveData = {};

    solveData.time = formatTime(solve.time, 2);
    if (solve.ao5)
      solveData.ao5 =
        solve.ao5.toFixed(2) == "0.00" ? undefined : solve.ao5.toFixed(2);
    if (solve.ao12)
      solveData.ao12 =
        solve.ao12.toFixed(2) == "0.00" ? undefined : solve.ao12.toFixed(2);

    solveData.idCategory = result.length - i;
    solveData.id = solve.id;

    solves.push(solveData);
  }

  res.render("index", {
    username: req.username,
    solves: solves,
    colors: colors,
  });
});

function formatTime(time, toFixed) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = time - minutes * 60 - hours * 3600;

  // seconds
  let text = seconds.toFixed(toFixed);

  // minutes
  if (minutes > 0) {
    if (seconds < 10) {
      text = "0" + text;
    }

    text = minutes + ":" + text;
  }

  // hours
  if (hours > 0) {
    if (minutes < 10) {
      text = "0" + text;
    }

    text = hours + ":" + text;
  }

  return text;
}

module.exports = router;
