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
module.exports = { createUser, getInfoByUsername, getInfoByEmail };
