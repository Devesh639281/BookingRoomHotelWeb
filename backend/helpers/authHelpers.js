const bcrypt = require("bcryptjs");

exports.hashPassword = async (password) => {
  try {
    var saltRound = 10;
    var hashedPassword = bcrypt.hash(password, saltRound);
    return hashedPassword;
  } catch (error) {
    res.send(error);
  }
};

exports.comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
