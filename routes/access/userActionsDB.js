const con = require("../../dbConnection.js");

// Creates a new user
function createUser(name, email, password) {
  return new Promise(function (resolve, reject) {
    con.query(
      'INSERT INTO users (email, username, password) VALUES ("' +
        email +
        '", "' +
        name +
        '", "' +
        password +
        '")',
      function (err, result, fields) {
        if (err) throw err;
        resolve();
      }
    );
  });
}

// Get users info from db
function getInfoByUsername(username) {
  return new Promise(function (resolve, reject) {
    con.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      }
    );
  });
}

function getInfoByEmail(email) {
  return new Promise(function (resolve, reject) {
    con.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      }
    );
  });
}

// Get all solves from the category
function getSolvesfromCategory(user_id, category) {
  return new Promise(function (resolve, reject) {
    con.query(
      "SELECT * FROM times WHERE users_id = ? AND category = ? ORDER BY date DESC",
      [user_id, category],
      function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      }
    );
  });
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

// Insert one solve
function insertSolve(user_id, category, time) {
  return new Promise(function (resolve, reject) {
    con.query(
      "INSERT INTO times VALUES(?, ?, ?, ?)",
      [user_id, category, formatDate(new Date()), time],
      function (err, result, fields) {
        if (err) throw err;
        resolve();
      }
    );
  });
}

module.exports = { createUser, getInfoByUsername, getInfoByEmail, getSolvesfromCategory, insertSolve };
