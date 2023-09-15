const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_KEY } = require("../config");

const stripe = require("stripe")(STRIPE_SECRET_KEY);

const isStripe = (request, response, next) => {
  try {
    var event = stripe.webhooks.constructEvent(
      request.body,
      request.headers["stripe-signature"],
      STRIPE_WEBHOOK_KEY
    );

    request.event = event;
    next();
  } catch (error) {
    console.log("Error @ stripe webhook: ", error.message);
    return response.status(403).send("Forbidden");
  }
};

module.exports = isStripe;
