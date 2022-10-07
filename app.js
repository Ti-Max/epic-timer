require('dotenv').config()

const express = require('express');
const path = require('path');
const con = require('./dbConnection.js');


// Routes
const indexRouter = require('./routes/index');

const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});