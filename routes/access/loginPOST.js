const express = require("express");
const router = express.Router();
const getInfoByUsername = require("./userActionsDB.js").getInfoByUsername;
const jwt = require("jsonwebtoken");
const unauth = require("../access/unauth");

const comparePasswords = require("./crypto.js").comparePasswords;

/* GET home page. */
router.post("/login", unauth, async function (req, res, next) {
  // Check input data
  if (!req.body.username || !req.body.password) {
    res.status(401).json({ error: "Missing username or password" });
  } else {
    // Check if user exists
    const rows = await getInfoByUsername(req.body.username);

    if (rows.length === 0) {
      res.status(401).json({ error: "User does not exist" });
    } else {
      // Check if password is correct
      if (await comparePasswords(req.body.password, rows[0].password ) === false) {
        res.status(401).json({ error: "Wrong password" });
      } else {
        // Create token
        const token = jwt.sign(
          {
            username: req.body.username,
            user_id: rows[0].id,
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "30d",
          }
        );

        // User is logged in
        res.status(201).json({ token: token });
      }
    }
  }
});

module.exports = router;
