const {mongodb} = require('./config');
const mongoose = require('mongoose');

const connectDB = async () => {

  try {
    await mongoose.connect(mongodb)
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
