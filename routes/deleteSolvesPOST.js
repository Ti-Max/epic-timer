const express = require("express");
const router = express.Router();

const deleteSolves = require("./access/userActionsDB.js").deleteSolves;

router.post("/deleteSolves", async function (req, res) {
  // Check request
  if (!Array.isArray(req.body.solves) || !req.body.category) {
    return res.status(400).send("Bad Request");
  }

  // Delete solves from database
  await deleteSolves(req.user_id, req.body.solves);

  return res.sendStatus(201);
});

module.exports = router;
