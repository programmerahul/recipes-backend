const express = require("express");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const winston = require("winston");

const app = express();
app.use(cors());
require("./startups/validate")();
require("./startups/logging")();
require("./startups/routes")(app);
require("./startups/database")();
require("./startups/config")();
require("./startups/prod")(app);

startupDebugger("started debugger...");
dbDebugger("started db...");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  winston.info(`listening on port ${port}...`);
});
