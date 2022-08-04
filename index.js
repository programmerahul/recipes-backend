const express = require("express");
const mongoose = require("mongoose");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const genresRouter = require("./routes/genres");
const customersRouter = require("./routes/customers");
const homeRouter = require("./routes/home");
const moviesRouter = require("./routes/movies");
const rentalsRouter = requite("./routes/rentals");

// console.log("name=" + config.get("name"));
// console.log("id :", config.get("mail.id"));
// console.log("password : ", config.get("password"));

mongoose
  .connect("mongodb://localhost/vidly")
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
app.use("/", homeRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
