const roomModel = require("../model/roomsModel");
exports.getAllRoomController = async (req, res) => {
  try {
    const roomData = await roomModel.find({});
    res.status(200).send({
      success: true,
      message: "Room Data Getting Successfully",
      roomData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong While getting Error",
      error,
    });
  }
};

exports.singleRoomController = async (req, res) => {
  try {
    const singleRoom = await roomModel.findById(req.params._id);
    res.status(200).send({
      success: true,
      message: "Single Room getting Successfully",
      singleRoom,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something Went Wrong While getting Single Room",
      error,
    });
  }
};

exports.addRoomsController = async (req, res) => {
  try {
    const newRoom = await roomModel.create({ ...req.body });

    console.log(newRoom);

    // Send success response
    res.status(201).send({
      message: "New Room Created Successfully",
      success: true,
      newRoom,
    });
  } catch (error) {
    console.error(error);

    // Send error response
    res.status(500).send({
      message: "Something Went Wrong",
      success: false,
      error: error.message,
    });
  }
};
