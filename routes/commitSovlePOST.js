var express = require("express");
var router = express.Router();

const insertSolve = require("./access/userActionsDB.js").insertSolve;
const getLastSolves = require("./access/userActionsDB.js").getLastSolves;

const calculateAO = require("./utils.js").calculateAO;

router.post("/commitSolve", async function (req, res, next) {
  // Check request
  if (!req.body.time || !req.body.category) {
    return res.status(400).send("Bad Request");
  }

  //get last 11 solves to calculate ao5 and ao12
  const solves = await getLastSolves(req.user_id, req.body.category, 11);
  const solvesParsed = [];
  solves.forEach((solve) => {
    solvesParsed.push(solve.time);
  });
  // add the newest solve
  solvesParsed.unshift(parseFloat(req.body.time));

  // Calculate average
  const ao12 = calculateAO(12, [...solvesParsed]); // copy array
  const ao5 = calculateAO(5, solvesParsed);

  // insert solve to database
  await insertSolve(req.user_id, req.body.category, req.body.time, ao5, ao12);
  return res.status(201).json({ao5: ao5, ao12: ao12});
});



module.exports = router;
