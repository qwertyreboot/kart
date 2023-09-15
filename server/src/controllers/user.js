const User = require("../models/user");
const Address = require("../models/address");
const GenericController = require("./helpers/generic");

class AddressController extends GenericController {
  static model = Address;
}

class UserController extends GenericController {
  static model = User;
}

module.exports = { UserController, AddressController };
