var express = require("express");
var router = express.Router();

const insertSolve = require("./access/userActionsDB.js").insertSolve;

router.post("/commitSolve", async function (req, res, next) {
  // Check request
  if (!req.body.time || !req.body.category) {
    return res.status(400).send("Bad Request");
  }

  // insert solve to database
  await insertSolve(req.user_id, req.body.category, req.body.time);
  return res.sendStatus(201);
});

module.exports = router;
