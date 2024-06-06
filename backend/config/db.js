const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.URL);
    console.log(
      `Database is Connected on ${conn.connection.host}`.bgRed.bold.white
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
