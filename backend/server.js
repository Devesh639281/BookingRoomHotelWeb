const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const viewRoute = require("./view/authView");
const roomRoute = require("./view/roomView");
const bookingRoute = require("./view/bookingsRoute");
const path = require("path");

dotenv.config();
connectDB();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/v1/auth", viewRoute);
app.use("/api/v1/roomData", roomRoute);
app.use("/api/v1/bookingData", bookingRoute);
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
app.listen(process.env.PORT, () => {
  console.log(
    `Server is Running On  port ${process.env.PORT}`.bgBlue.bold.white
  );
});
