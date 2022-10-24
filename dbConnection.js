const mysql = require("mysql2");

const con = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "epicTimer",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

let sess;

module.exports = con;
