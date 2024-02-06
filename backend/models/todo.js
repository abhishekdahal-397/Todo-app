const mongoose = require("mongoose");

// Define the schema for the Todo model
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Corrected here
  },
});

// Create the Todo model using the schema
const Todo = mongoose.model("Todo", todoSchema);

// Export the Todo model
module.exports = Todo;
