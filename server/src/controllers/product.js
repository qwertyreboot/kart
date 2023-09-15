const Product = require("../models/product");
const Rating = require("../models/rating");
const Comment = require("../models/comment");
const GenericController = require("./helpers/generic");

class ProductController extends GenericController {
  static model = Product;

  static async create(request, response) {
    const body = request.body;
    const images = request.files?.map((image) => {
      const b64 = image.buffer.toString("base64");
      return `data:image/jpeg;base64,${b64}`;
    });

    const document = await this.model?.create({ ...body, images });

    response.status(201).json(document);
  }

  static async rate(request, response) {
    const id = request.params.id;
    const body = request.body;

    const rating = await Rating.create({
      ...body,
      product: id,
      user: request.user.id,
    });

    response.status(200).json({ rating });
  }

  static async comment_create(request, response) {
    const productId = request.params.productId;
    const body = request.body;

    const comment = await Comment.create({
      ...body,
      product: productId,
      user: request.user?.id,
    });

    response.status(201).json(comment);
  }

  static async comment_list(request, response) {
    const productId = request.params.productId;

    const comments = await Comment.find({ product: productId });

    response.status(200).json(comments);
  }

  static async comment_read(request, response) {
    const id = request.params.id;

    const comment = await Comment.findById(id);

    response.status(200).json(comment);
  }

  static async comment_update(request, response) {
    const id = request.params.id;
    const body = request.body;

    const comment = await Comment.findOne({ id, user: request.user.id });
    if (!comment) {
      throw new Error("Comment not found");
    }

    comment.set(body);
    await comment.save();

    response.status(200).json(comment);
  }

  static async comment_delete(request, response) {
    const id = request.params.id;

    const comment = await Comment.findOneAndDelete({
      id,
      user: request.user.id,
    });

    response.status(200).json(comment);
  }
}

module.exports = ProductController;
