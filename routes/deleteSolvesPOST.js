var express = require("express");
var router = express.Router();

const deleteSolves = require("./access/userActionsDB.js").deleteSolves;
const getLastSolves = require("./access/userActionsDB.js").getLastSolves;
const getSolvesSince = require("./access/userActionsDB.js").getSolvesSince;
const getSolvesBeforeAmount =
  require("./access/userActionsDB.js").getSolvesBeforeAmount;
const updateAO = require("./access/userActionsDB.js").updateAO;

const calculateAO = require("./utils.js").calculateAO;

router.post("/deleteSolves", async function (req, res, next) {
  // Check request
  if (!Array.isArray(req.body.solves) || !req.body.category) {
    return res.status(400).send("Bad Request");
  }

  // Delete solves from database
  await deleteSolves(req.user_id, req.body.solves);

  // Update ao5 and ao12 for every solve that was created before the deleted solves
  // Find earliest one
  const earliestSolve = Math.min(...req.body.solves);

  // Solve ids for those who needs update
  const solvesToUpdate = await getSolvesSince(
    req.user_id,
    req.body.category,
    earliestSolve
  );

  const lastAOs = {};
  // Update
  for (let i = 0; i < solvesToUpdate.length; i++) {
    //get 12 solves to calculate ao5 and ao12 before
    const solves = await getSolvesBeforeAmount(
      req.user_id,
      req.body.category,
      solvesToUpdate[i].id,
      12
    );
    const solvesParsed = [];
    solves.forEach((solve) => {
      solvesParsed.push(solve.time);
    });

    // Calculate average
    const ao12 = calculateAO(12, [...solvesParsed]); // copy array
    const ao5 = calculateAO(5, solvesParsed);

    // Insert new ao5 and ao12 to the database
    await updateAO(solvesToUpdate[i].id, ao5, ao12);

    if (lastAOs.ao5 === undefined) {
      lastAOs.ao5 = ao5;
      lastAOs.ao12 = ao12;
    }
  }

  if (lastAOs.ao5 === undefined){
    const lastNewSolve = await getLastSolves(req.user_id, req.body.category, 1);
    if (lastNewSolve.length !== 0){
      lastAOs.ao5 = lastNewSolve[0].ao5;
      lastAOs.ao12 = lastNewSolve[0].ao12;
    }
  }

  return res.status(201).json({ ao5: lastAOs.ao5, ao12: lastAOs.ao12 });
});

module.exports = router;
