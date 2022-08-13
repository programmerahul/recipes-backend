require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
module.exports = function () {
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({ db: "mongodb://localhost/Vidly" })
  );
  winston.add(
    new winston.transports.Console({ prettyPrint: true, colorize: true })
  );

  process.on("uncaughtException", (ex) => {
    winston.error(ex.message);
  });
  process.on("unhandledRejection", (ex) => {
    winston.error(ex.message);
  });
};
