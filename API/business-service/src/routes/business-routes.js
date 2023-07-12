const express = require("express");

const getUsers = require("../controllers/business-controllers");
const { validateRequest, verifyToken } = require("../middlewares/auth");

const router = express.Router();

router.get("/users", validateRequest, verifyToken, getUsers);

module.exports = router;
