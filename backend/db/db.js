const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://abhishekdahal397:SjDWHX0LrRpxOFO8@cluster0.71q0tcu.mongodb.net/",
      {}
    );

    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the process if unable to connect to the database
  }
};

module.exports = connectDB;
