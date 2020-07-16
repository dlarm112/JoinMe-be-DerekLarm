var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");

var indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const eventRouter = require("./routes/events");
const auth = require("./routes/auth");
require("dotenv").config();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose
  .connect(process.env.DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongoose connected to database"))
  .catch((err) => console.error("failed to connect to MongoDB...", err));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/event", eventRouter);
app.use("/auth", auth);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
