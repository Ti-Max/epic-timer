const con = require("../../dbConnection.js");

// Creates a new user
function createUser(name, email, password) {
  return new Promise(function (resolve) {
    con.query(
      "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
      [email, name, password],
      function (err) {
        if (err) throw err;
        resolve();
      }
    );
  });
}

// Get users info from db
function getInfoByUsername(username) {
  return new Promise(function (resolve) {
    con.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      function (err, result) {
        if (err) throw err;
        resolve(result);
      }
    );
  });
}

function getInfoByEmail(email) {
  return new Promise(function (resolve) {
    con.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      function (err, result) {
        if (err) throw err;
        resolve(result);
      }
    );
  });
}

// Get all solves from the category
function getSolvesfromCategory(user_id, category) {
  return new Promise(function (resolve) {
    con.query(
      "SELECT * FROM times WHERE users_id = ? AND category = ? ORDER BY date DESC",
      [user_id, category],
      function (err, result) {
        if (err) throw err;
        resolve(result);
      }
    );
  });
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  );
}

// Insert one solve
function insertSolve(user_id, uuid, category, time, scramble) {
  return new Promise(function (resolve) {
    con.query(
      "INSERT INTO times (users_id, uuid, category, date, time, scramble) VALUES(?, ?, ?, ?, ?, ?)",
      [user_id, uuid, category, formatDate(new Date()), time, scramble],
      function (err) {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") console.log("dublicate uuid");
          else throw err;
        }
        resolve();
      }
    );
  });
}

function deleteSolves(user_id, solves) {
  return new Promise(function (resolve) {
    con.query(
      "DELETE FROM times WHERE users_id = ? AND uuid IN (?)",
      [user_id, solves],
      function (err, result) {
        if (err) throw err;
        resolve(result);
      }
    );
  });
}

module.exports = {
  createUser,
  getInfoByUsername,
  getInfoByEmail,
  getSolvesfromCategory,
  insertSolve,
  deleteSolves,
};
