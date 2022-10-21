require("./db/mongoose");
const usersRouter = require("../src/routers/user");
const express = require("express");
const app = express();


app.use(express.json());
app.use(usersRouter);

module.exports = app;
