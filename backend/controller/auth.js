const authModel = require("../model/authModel");
const { hashPassword, comparePassword } = require("../helpers/authHelpers");
const JWT = require("jsonwebtoken");
exports.registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, isAdmin } = req.body;
    if (!name || !email || !phone || !password || !address) {
      return res.status(404).send({ message: "All Fields are Required" });
    }
    const alreadyExisting = await authModel.findOne({ email });
    if (alreadyExisting) {
      return res
        .status(200)
        .send({ success: false, message: "User Already Existing" });
    }
    const hashedPassword = await hashPassword(password);
    const users = await new authModel({
      name,
      email,
      phone,
      isAdmin,
      password: hashedPassword,
      address,
    }).save();

    res
      .status(201)
      .send({ success: true, message: "User Created Successfully", users });
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(404).send({ message: "Email is Required" });
    }
    if (!password) {
      res.status(404).send({ message: "Password is Required" });
    }

    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        isAdmin: user.isAdmin,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Internal Server Error", success: false, error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await authModel.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong During Room Booking",
      error: error.message,
    });
  }
};
