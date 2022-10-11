require("dotenv").config();

const express = require("express");
const path = require("path");
const auth = require("./routes/access/auth");

// Routes
const loginPOST = require("./routes/access/loginPOST");
const signupPOST = require("./routes/access/signupPOST");
const logoutPOST = require("./routes/access/logoutGET");

const accessRouter = require("./routes/access/access");
const indexRouter = require("./routes/index");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Pages without Authorization
app.use(accessRouter);
app.use(loginPOST);
app.use(signupPOST);

// Need token
app.use(auth);
app.use(indexRouter);
app.use(logoutPOST);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
