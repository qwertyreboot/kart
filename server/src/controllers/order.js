const { STRIPE_SECRET_KEY, CLIENT_URL } = require("../config");
const Order = require("../models/order");
const Product = require("../models/product");
const Address = require("../models/address");
const GenericController = require("./helpers/generic");
const webpush = require("../utils/webpush");

const stripe = require("stripe")(STRIPE_SECRET_KEY);

class OrderController extends GenericController {
  static model = Order;

  static async list(req, res) {
    const user = req.user;
    const { page = 1 } = req.query;

    const orders = await Order.find({ user: user._id })
      .populate("address products.product user")
      .skip((page - 1) * this.itemsPerPage)
      .limit(this.itemsPerPage);
    res.status(200).json(orders);

    console.log(user.subscription);

    webpush.sendNotification(
      user.subscription,
      JSON.stringify({
        title: "Order List Sent",
        body: "Your order has been placed successfully",
      })
    );
  }

  static async create(req, res) {
    const { address: address_obj, products } = req.body;
    const user = req.user;

    const address = await Address.create({ ...address_obj, user: user._id });

    const order = await (
      await Order.create({
        user: user._id,
        address: address._id,
        products,
      })
    ).populate("address products.product");

    const session = await stripe.checkout.sessions.create({
      line_items: order.products.map(({ product, quantity }) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: product.title,
          },
          unit_amount: product.price * 100,
        },
        quantity,
      })),
      client_reference_id: order._id.toString(),
      customer_email: user.email,
      mode: "payment",
      success_url: CLIENT_URL,
      cancel_url: CLIENT_URL + "/checkout",
    });

    return res.status(201).json({ url: session.url });
  }

  static async stripeWebhook(request, response) {
    const event = request.event;

    switch (event.type) {
      case "checkout.session.completed": {
        const client_reference_id = event.data.object.client_reference_id;
        const payment_intent = event.data.object.payment_intent;
        const payment_status = event.data.object.payment_status;

        const order = await Order.findById(client_reference_id);
        order.payment.id = payment_intent;
        order.payment.status = payment_status === "paid" ? "success" : "failed";
        order.status = payment_status === "paid" ? "paid" : "cancelled";
        await order.save();
        break;
      }

      case "payment_intent.succeeded": {
        // TODO: update status of the order
      }

      case "payment_intent.payment_failed": {
        // TODO: update status of the order
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.send();
  }
}

module.exports = OrderController;
