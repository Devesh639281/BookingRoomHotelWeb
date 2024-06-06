const moment = require("moment");
const bookingModel = require("../model/bookingModel");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const roomModel = require("../model/roomsModel");
// const stripe = require("stripe")(
//   "sk_test_51OzXkTSEgGIx9vSpFBz3F1JgYW1nS9zjSo4PjKQn3FmFinyXVYRX3QquSDU88Tljk4iiMQiD5czsZJiH8AxqTfNR00Zukjvvon"
// );
// const { v4: uuidv4 } = require("uuid");

exports.roomBookController = async (req, res) => {
  const { room, fromdate, todate, totalamount, totaldays, userid } = req.body;

  try {
    // const customer = await stripe.customers.create({
    //   email: token.email,
    //   source: token.id,
    // });

    // const payment = await stripe.charges.create(
    //   {
    //     amount: totalamount * 100,
    //     customer: customer.id,
    //     currency: "inr",
    //     receipt_email: token.email,
    //   },
    //   {
    //     idempotencyKey: uuidv4(),
    //   }
    // );
    // if (payment) {
    const roomObjectId = new mongoose.Types.ObjectId(room.singleRoom._id);
    const userObjectId = new mongoose.Types.ObjectId(userid);

    const bookingDetails = new bookingModel({
      room: room.singleRoom.name,
      roomid: roomObjectId,
      userid: userObjectId,
      totalamount,
      totaldays,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
    });

    const booking = await bookingDetails.save();

    // Find the room and update its current bookings
    const roomTemp = await roomModel.findById(roomObjectId);
    if (!roomTemp) {
      return res.status(404).send({
        success: false,
        message: "Room not found",
      });
    }

    roomTemp.currentbookings.push({
      bookingid: booking._id,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      userid: userObjectId,
      status: booking.status,
    });

    await roomTemp.save();

    res.status(200).send({
      success: true,
      message: "Room booked successfully. Payment Done.",
    });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getBookingByUserId = async (req, res) => {
  try {
    const bookings = await bookingModel.find({ userid: req.body.userid });
    res.send(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong During Room Booking",
      error: error.message,
    });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { bookingid, roomid } = req.body;

    // Update the booking status to "Cancelled"
    const booking = await bookingModel.findByIdAndUpdate(
      bookingid,
      { status: "Cancelled" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).send({
        success: false,
        message: "Booking not found",
      });
    }

    // Remove the booking from the room's current bookings
    const room = await roomModel.findByIdAndUpdate(
      roomid,
      {
        $pull: {
          currentbookings: { bookingid: bookingid },
        },
      },
      { new: true }
    );

    if (!room) {
      return res.status(404).send({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Room Cancelled Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find();
    res.send(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong During Room Booking",
      error: error.message,
    });
  }
};
