const express = require("express");
const { check } = require("express-validator");

const {
  signup,
  authenticate,
  getUsers,
} = require("../controllers/login-controllers");
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/signup",
  [
    check("email").normalizeEmail({ gmail_remove_dots: false }).isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  signup
);

router.post(
  "/authenticate",
  [check("email").normalizeEmail({ gmail_remove_dots: false })],
  authenticate
);

router.get("/users", verifyToken, getUsers);

module.exports = router;
