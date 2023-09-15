const express = require("express");

const AuthController = require("../controllers/auth");
const catchAsync = require("../utils/catchAsync");

const router = express.Router();

router.post(
  "/signup",
  catchAsync((req, res) => AuthController.signup(req, res))
);
router.post(
  ["/signin", "/login"],
  catchAsync((req, res) => AuthController.signin(req, res))
);

module.exports = router;
