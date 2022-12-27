const express = require("express");
const router = express.Router();

const { updateAverage } = require("./updateAverage.js");
const deleteSolves = require("./access/userActionsDB.js").deleteSolves;

router.post("/deleteSolves", async function (req, res) {
  // Check request
  if (!Array.isArray(req.body.solves) || !req.body.category) {
    return res.status(400).send("Bad Request");
  }

  // Delete solves from database
  await deleteSolves(req.user_id, req.body.solves);

  // Update ao5 and ao12 for every solve that was created before the deleted solves
  const lastAOs = await updateAverage(
    req.body.solves,
    req.user_id,
    req.body.category
  );

  return res.status(201).json({ ao5: lastAOs.ao5, ao12: lastAOs.ao12 });
});

module.exports = router;
