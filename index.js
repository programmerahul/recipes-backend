const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const genresRouter = require("./routes/genres");
const customersRouter = require("./routes/customers");
const homeRouter = require("./routes/home");

// console.log("name=" + config.get("name"));
// console.log("id :", config.get("mail.id"));
// console.log("password : ", config.get("password"));

mongoose
  .connect(
    "mongodb+srv://rahul:rahulcluster@cluster0movies.dvxou.mongodb.net/?retryWrites=true&w=majority"
  )
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
app.use("/", homeRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
  });
  return schema.validate(genre);
}
