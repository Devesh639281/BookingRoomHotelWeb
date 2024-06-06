const express = require("express");
const {
  roomBookController,
  getBookingByUserId,
  cancelBooking,
  getAllBookings,
} = require("../controller/bookingController");
const router = express.Router();
router.post("/bookroom", roomBookController);
router.post("/getBookingByUserId", getBookingByUserId);
router.post("/cancelBooking", cancelBooking);
router.post("/getAllBookings", getAllBookings);

module.exports = router;
