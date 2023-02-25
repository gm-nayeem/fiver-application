// import modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

// import routes
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const gigRoute = require("./routes/gigRoute");
const reviewRoute = require("./routes/reviewRoute");
const orderRoute = require("./routes/orderRoute");
// const conversationRoute = require("./routes/conversationRoute");
// const messageRoute = require("./routes/messageRoute");



const app = express();

// mongodb connection
mongoose.set("strictQuery", true);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log(error);
  }
};

// middlewares
app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);
// app.use("/api/conversations", conversationRoute);
// app.use("/api/messages", messageRoute);


// error generate
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

// server run on this port
app.listen(process.env.PORT, () => {
  connect();
  console.log("Backend server is running!");
});