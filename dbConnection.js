const mysql = require("mysql2");

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "epictimer",
});

con.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Connected to mysql database");
  }
});

let sess;

module.exports = con;
