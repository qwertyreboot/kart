const express = require("express");

const OrderController = require("../controllers/order");
const catchAsync = require("../utils/catchAsync");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isStripe = require("../middlewares/isStripe");

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  catchAsync((req, res) => OrderController.create(req, res))
);
router.get(
  "/",
  isAuthenticated,
  catchAsync((req, res) => OrderController.list(req, res))
);
router.get(
  "/:id",
  isAuthenticated,
  catchAsync((req, res) => OrderController.read(req, res))
);
router.patch(
  "/:id",
  isAuthenticated,
  catchAsync((req, res) => OrderController.update(req, res))
);
router.delete(
  "/:id",
  isAuthenticated,
  catchAsync((req, res) => OrderController.delete(req, res))
);
router.post(
  "/stripe/webhook",
  isStripe,
  catchAsync((req, res) => OrderController.stripeWebhook(req, res))
);

module.exports = router;
