const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const loginRoutes = require("./routes/login-routes");

const HttpError = require("./models/http-error");

require("dotenv").config();
const mongoURI = process.env.MONGO_URI;

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  next();
});

app.use("/api", loginRoutes);

app.use((req, res, next) => {
  next(new HttpError("Could not find this route", 404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error ocurred" });
});

mongoose
  .connect(mongoURI)
  .then(() => {
    app.listen(port, () => {
      console.log("listening");
    });
  })
  .catch(() => {
    throw new HttpError("Unable to connect to database", 503);
  });
