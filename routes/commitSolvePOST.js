const express = require("express");
const router = express.Router();

const insertSolve = require("./access/userActionsDB.js").insertSolve;

const isValidRequest = (req) => {
  return (
    req.body.time && req.body.category && req.body.scramble && req.body.uuid
  );
};

router.post("/commitSolve", async function (req, res) {
  // Check request
  if (!isValidRequest(req)) {
    return res.status(400).send("Bad Request");
  }

  // insert solve to database
  await insertSolve(
    req.user_id,
    req.body.uuid,
    req.body.category,
    req.body.time,
    req.body.scramble
  );

  return res.sendStatus(201);
});

module.exports = router;
