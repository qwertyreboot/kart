const User = require("../models/user");

class NotificationController {
  static async subscribe(request, response) {
    const subscription = request.body;
    const user = request.user;

    user.subscription = subscription;
    await user.save();

    return response.status(200).json({ message: "Subscribed successfully" });
  }

  static async unsubscribe(request, response) {}
}

module.exports = NotificationController;
