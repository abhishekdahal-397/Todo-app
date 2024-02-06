const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db.js");
const todoRoutes = require("./routes/todoRoutes");
const app = express();
// Middleware setup
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Use the todo routes
app.use("/api", todoRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
