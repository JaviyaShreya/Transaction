const User = require("../models/user");
const {status} = require("../utils/status")

const createUser = async (req, res) => {
  try {
    const { name, email, balance } = req.body;
    const user = new User({ name, email, balance });
    await user.save();
    res.status(status.CREATED).json(user);
  } catch (err) {
    res.status(status.SERVER_ERROR).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(status.OK).json(users);
  } catch (err) {
    res.status(status.SERVER_ERROR).json({ error: err.message });
  }
};

module.exports = { createUser, getAllUsers };
