require("./db/mongoose");
const usersRouter = require("../src/routers/user");
const booksRouter=require("../src/routers/book")
const express = require("express");
const app = express();


app.use(express.json());
app.use(usersRouter);
app.use(booksRouter);

module.exports = app;
