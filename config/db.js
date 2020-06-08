const mongoose = require("mongoose");
const config = require("config"); // to get global variable stored in config/default.json
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(err.message);
    // exit process with failure
    precess.exit(1);
  }
};

module.exports = connectDB;
