// load env variables
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config/config.env` });

var express = require("express");
var logger = require("morgan");
const AppError = require("./utils/appError");
const globalErrorhandler = require("./controllers/errorControllers");
// Route

// setup express app
const app = express();

// boilerplate middleware

if (app.get("env") !== "production") {
  app.use(logger("dev"));
}

app.get("/test-route", (req, res) => {
  res.send("A small step for man but a gaint leap for humanity 🚀👨🏿‍🚀");
});

// catch 404 and forward to error handler
app.all("*", (req, res, next) => {
  next(
    new AppError(
      `This url ${req.originalUrl} was not found on this server.`,
      404
    )
  );
});

app.use(globalErrorhandler);

module.exports = app;
