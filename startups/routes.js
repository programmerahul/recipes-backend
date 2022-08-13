const genresRouter = require("../routes/genres");
const customersRouter = require("../routes/customers");
const homeRouter = require("../routes/home");
const moviesRouter = require("../routes/movies");
const rentalsRouter = require("../routes/rentals");
const usersRouter = require("../routes/users");
const authRouter = require("../routes/auth");
const error = require("../middleWare/error");
const express = require("express");

module.exports = function (app) {
  app.use(express.json());
  app.set("view engine", "pug");
  app.set("views", "./views");
  app.use("/api/genres", genresRouter);
  app.use("/api/customer", customersRouter);
  app.use("/api/movies", moviesRouter);
  app.use("/api/rentals", rentalsRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/auth", authRouter);
  app.use("/", homeRouter);
  app.use(error);
};
