const express = require('express');
const path = require('path');

// Routes
const indexRouter = require('./routes/index');

const app = express();
const port = 8000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});