const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { PORT, MONGODB_URI } = require("./config");

const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const userRouter = require("./routes/user");
const notificationRouter = require("./routes/notification");

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors());
app.use("/orders/stripe/webhook", express.raw({ type: "application/json" }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/auth", authRouter);
// TODO: support image uploads
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/users", userRouter);
app.use("/notifications", notificationRouter);

app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
