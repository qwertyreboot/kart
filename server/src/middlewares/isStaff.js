const { JWT_ACCESS_SECRET } = require("../config");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

async function isStaff(request, response, next) {
  try {
    const token = request.headers.authorization?.split(" ")?.[1];
    const userId = jwt.verify(token, JWT_ACCESS_SECRET);

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.role === "staff") {
      throw new Error("User not permitted to do this action");
    }

    request.user = user;
    next();
  } catch (error) {
    console.log(error);
    response.status(403).json({ error });
  }
}

module.exports = isStaff;
