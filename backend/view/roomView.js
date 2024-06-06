const express = require("express");
const {
  getAllRoomController,
  singleRoomController,
  addRoomsController,
} = require("../controller/roomController");
const router = express.Router();
router.get("/getAllRooms", getAllRoomController);

router.get("/singleRoom/:_id", singleRoomController);
router.post("/createRoom", addRoomsController);
module.exports = router;
