const express = require("express");
const { registerController, loginController,getAllUsers } = require("../controller/auth");
const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/getAllUsers", getAllUsers);
module.exports = router;
