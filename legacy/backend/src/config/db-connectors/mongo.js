const mongoose = require("mongoose");

const connectMongoDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    throw new Error("❌ MongoDB connection failed: " + err.message);
  }
};

module.exports = connectMongoDB;
