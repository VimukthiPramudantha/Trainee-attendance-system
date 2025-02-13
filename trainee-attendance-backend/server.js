const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection success...");
});

// Import Routes
const authRoutes = require("./routes/authRoutes"); // Correct import for authRoutes
const traineeRoutes = require("./routes/traineeRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

// Use Routes
app.use("/api/auth", authRoutes);  // Authentication routes
app.use("/api/trainees", traineeRoutes);  // Trainee routes
app.use("/api/attendance", attendanceRoutes);  // Attendance routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
