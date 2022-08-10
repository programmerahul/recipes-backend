const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const mongoose = require("mongoose");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const genresRouter = require("./routes/genres");
const customersRouter = require("./routes/customers");
const homeRouter = require("./routes/home");
const moviesRouter = require("./routes/movies");
const rentalsRouter = require("./routes/rentals");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const config = require("config");

// console.log("name=" + config.get("name"));
// console.log("id :", config.get("mail.id"));
// console.log("password : ", config.get("password"));
if (!config.get("jwtPrivateKey")) {
  console.log("Fatal Error:vidly_jwtPrivateKey is not defined!");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/Vidly")
  .then(() => {
    console.log("Connected to mongodb...");
  })
  .catch((err) => {
    console.log("Error while connecting to mongodb:", err);
  });

const app = express();
app.use(express.json());
app.set("view engine", "pug");
app.set("views", "./views");
startupDebugger("started start...");
dbDebugger("started db...");

app.use("/api/genres", genresRouter);
app.use("/api/customer", customersRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/rentals", rentalsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/", homeRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
