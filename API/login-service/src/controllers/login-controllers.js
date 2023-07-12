const { validationResult } = require("express-validator");
const axios = require("axios");

const HttpError = require("../models/http-error");
const User = require("../models/user");
const { generateToken } = require("../middlewares/auth");

// SIGNUP
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check data", 422));
  }

  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    const error = new HttpError("Signup failed", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("Email already in use", 422);
    return next(error);
  }

  const createdUser = new User({
    email,
    password,
  });

  try {
    await createdUser.save();
  } catch (e) {
    const error = new HttpError("Signup failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ message: "User created!" });
};

// LOGIN
const authenticate = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check data", 422));
  }

  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    const error = new HttpError("Authentication failed", 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "Authentication failed, invalid credentials",
      401
    );
    return next(error);
  }

  const token = generateToken();

  res.cookie("token", token, {
    maxAge: 3600000,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  res.status(200).json({ message: "Logged In!" });
};

// GET ALL USERS REQUEST TO ENDPOINT 4
const getUsers = async (req, res, next) => {
  const limit = req.query.limit;
  const page = req.query.page;
  const search = req.query.search;

  let users;
  let response;
  try {
    response = await axios.get(
      `http://localhost:5001/api/users?limit=${limit || 5}&&page=${
        page || 1
      }&search=${search || ""}`,
      {
        withCredentials: true,
        headers: {
          Authorization: req.headers.authorization,
          "x-business-request": "login-service",
          Cookie: req.cookies.token,
        },
      }
    );
  } catch (e) {
    const { message } = e.response.data;
    const error = new HttpError(message, 503);
    return next(error);
  }

  users = response.data;

  res.status(200).json(users);
};

exports.signup = signup;
exports.authenticate = authenticate;
exports.getUsers = getUsers;
