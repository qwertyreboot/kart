class GenericController {
  static model = null;
  static itemsPerPage = 10;

  constructor() {
    throw new Error("Cannot instantiate a static class");
  }

  static async create(request, response) {
    const body = request.body;

    const document = await this.model?.create(body);

    response.status(201).json(document);
  }

  static async list(request, response) {
    const page = request.query.page || 1;

    const documents = await this.model
      ?.find()
      .skip((page - 1) * this.itemsPerPage)
      .limit(this.itemsPerPage);

    response.status(200).json(documents);
  }

  static async read(request, response) {
    const id = request.params.id;

    const document = await this.model?.findById(id);

    response.status(200).json(document);
  }

  static async update(request, response) {
    const id = request.params.id;
    const body = request.body;

    const document = this.model?.findById(id);
    if (!document) {
      throw new Error("Item not found");
    }

    document.set(body);
    await document.save();

    response.status(200).json(document);
  }

  static async delete(request, response) {
    const id = request.params.id;

    const document = await this.model?.findByIdAndDelete(id);

    response.status(200).json(document);
  }
}

module.exports = GenericController;
