const homeRouter = require("../routes/home");
const usersRouter = require("../routes/users");
const authRouter = require("../routes/auth");
const error = require("../middleWare/error");
const express = require("express");

const methodOverride = require("method-override");
const bodyparser = require("body-parser");
module.exports = function (app) {
  app.use(bodyparser.json());
  app.use(methodOverride("_method"));
  app.use(express.json());
  app.set("view engine", "pug");
  app.set("views", "./views");
  app.use("/api/users", usersRouter);
  app.use("/api/auth", authRouter);
  app.use("/", homeRouter);
  app.use(error);
};
