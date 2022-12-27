const express = require("express");
const router = express.Router();

// database actions
const getInfoByEmail = require("./userActionsDB.js").getInfoByEmail;
const getInfoByUsername = require("./userActionsDB.js").getInfoByUsername;
const createUser = require("./userActionsDB.js").createUser;

// Hashing password
const hashPassword = require("./crypto.js").hashPassword;

router.post("/signup", async function (req, res) {
  // Check input data
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.status(400).json({ error: "Missing username or password or email" });
  } else {
    // Check if user exists
    let rows = await getInfoByUsername(req.body.username);
    if (rows.length > 0) {
      return res.status(409).json({ error: "Username already in use" });
    }

    // Check if email in use
    rows = await getInfoByEmail(req.body.email);
    if (rows.length > 0) {
      return res.status(409).json({ error: "Email already in use" });
    } else {
      // Create user
      await createUser(
        req.body.username,
        req.body.email,
        await hashPassword(req.body.password)
      );

      res.status(201).json({});
    }
  }
});

module.exports = router;
