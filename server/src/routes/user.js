const express = require("express");

const { UserController, AddressController } = require("../controllers/user");

const catchAsync = require("../utils/catchAsync");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

router.get(
  "/:id",
  isAuthenticated,
  catchAsync((req, res) => UserController.read(req, res))
);

router.patch(
  "/:id",
  isAuthenticated,
  catchAsync((req, res) => UserController.update(req, res))
);

router.get(
  "/:userId/addresses",
  isAuthenticated,
  catchAsync((req, res) => AddressController.list(req, res))
);

router.post(
  "/:userId/addresses",
  isAuthenticated,
  catchAsync((req, res) => AddressController.create(req, res))
);

router.patch(
  "/:userId/addresses/:id",
  isAuthenticated,
  catchAsync((req, res) => AddressController.update(req, res))
);

router.delete(
  "/:userId/addresses/:id",
  isAuthenticated,
  catchAsync((req, res) => AddressController.delete(req, res))
);

module.exports = router;
