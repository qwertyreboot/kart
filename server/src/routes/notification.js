const express = require("express");

const NotificationController = require("../controllers/notification");
const catchAsync = require("../utils/catchAsync");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

router.post(
  "/subscribe",
  isAuthenticated,
  catchAsync((req, res) => NotificationController.subscribe(req, res))
);
router.post(
  "/unsubscribe",
  isAuthenticated,
  catchAsync((req, res) => NotificationController.unsubscribe(req, res))
);

module.exports = router;
