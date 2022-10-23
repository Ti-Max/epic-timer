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
    solves.push({ time: formatTime(solve.time, 2), id: result.length - i });
  }

  res.render("index", {
    username: req.username,
    solves: solves,
    colors: colors,
  });
});

function formatTime(time, toFixed){
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = time - minutes * 60 - hours * 3600;

  // seconds
  let text = seconds.toFixed(toFixed);

  // minutes
  if (minutes > 0){
    if (seconds < 10){
      text = "0" + text;
    }

    text = minutes + ":" + text;
  }

  // hours
  if (hours > 0){
    if (minutes < 10){
      text = "0" + text;
    }

    text = hours + ":" + text;
  }

  return text;
}

module.exports = router;
