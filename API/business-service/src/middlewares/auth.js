const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

const validateRequest = (req, res, next) => {
  const referringService = req.headers["x-business-request"];
  if (referringService === "login-service") {
    next();
  } else {
    return next(new HttpError("Access denied", 403));
  }
};

const verifyToken = (req, res, next) => {
  let token = req.headers.cookie;

  if (!token) {
    return next(new HttpError("Access denied", 401));
  }

  try {
    jwt.verify(token, secretKey);
    next();
  } catch (e) {
    return next(new HttpError("Invalid Token", 401));
  }
};

exports.verifyToken = verifyToken;
exports.validateRequest = validateRequest;
