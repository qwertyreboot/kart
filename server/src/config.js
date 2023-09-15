require("dotenv").config();

const PORT = process.env.PORT || 3000;

const JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET ||
  require("crypto").randomBytes(64).toString("hex");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/kart";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_KEY = process.env.STRIPE_WEBHOOK_KEY;
const CLIENT_URL = process.env.CLIENT_URL ?? "http://localhost:5173";

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

module.exports = {
  PORT,
  JWT_ACCESS_SECRET,
  MONGODB_URI,
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_KEY,
  CLIENT_URL,
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY,
};
