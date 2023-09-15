const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { JWT_ACCESS_SECRET } = require("../config");

class AuthController {
  static async signup(request, response) {
    const body = request.body;
    const password = await bcrypt.hash(body.password, 10);

    const user = await User.create({ ...body, password, role: "user" });
    const token = jwt.sign(user.id, JWT_ACCESS_SECRET);

    response
      .status(201)
      .json({ user: { ...user._doc, password: undefined }, token });
  }

  static async signin(request, response) {
    const { username, password } = request.body;

    const user = await User.findOne({
      $or: [{ phone: username }, { email: username }],
    });

    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!isPasswordValid) {
      return response.status(403).json({ error: "Credentials did not match" });
    }

    const token = jwt.sign(user.id, JWT_ACCESS_SECRET);

    response
      .status(200)
      .json({ user: { ...user._doc, password: undefined }, token });
  }
}

module.exports = AuthController;
