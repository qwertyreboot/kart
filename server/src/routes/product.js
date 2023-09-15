const express = require("express");
const multer = require("multer");

const ProductController = require("../controllers/product");
const catchAsync = require("../utils/catchAsync");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isStaff = require("../middlewares/isStaff");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  isStaff,
  upload.array("images"),
  catchAsync((req, res) => ProductController.create(req, res))
);
router.get(
  "/",
  catchAsync((req, res) => ProductController.list(req, res))
);
router.get(
  "/:id",
  catchAsync((req, res) => ProductController.read(req, res))
);
router.patch(
  "/:id",
  isStaff,
  catchAsync((req, res) => ProductController.update(req, res))
);
router.delete(
  "/:id",
  isStaff,
  catchAsync((req, res) => ProductController.delete(req, res))
);

router.post(
  "/:id/ratings",
  isAuthenticated,
  catchAsync((req, res) => ProductController.rate(req, res))
);

router.get(
  "/:productId/comments",
  catchAsync((req, res) => ProductController.comment_list(req, res))
);

router.get(
  "/:productId/comments/:id",
  catchAsync((req, res) => ProductController.comment_read(req, res))
);

router.post(
  "/:productId/comments",
  isAuthenticated,
  catchAsync((req, res) => ProductController.comment_create(req, res))
);

router.patch(
  "/:productId/comments/:id",
  isAuthenticated,
  catchAsync((req, res) => ProductController.comment_update(req, res))
);

router.delete(
  "/:productId/comments/:id",
  isAuthenticated,
  catchAsync((req, res) => ProductController.comment_delete(req, res))
);

module.exports = router;
