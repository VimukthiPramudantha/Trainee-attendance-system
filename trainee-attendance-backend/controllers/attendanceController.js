const Attendance = require("../models/Attendance");

// Mark attendance
const markAttendance = async (req, res) => {
  try {
    const { traineeID, date, status } = req.body;
    const newAttendance = new Attendance({ traineeID, date, status });
    await newAttendance.save();
    res.status(201).json({ message: "Attendance marked successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error marking attendance" });
  }
};

// Get attendance records
const getAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ error: "Error fetching attendance records" });
  }
};

module.exports = { markAttendance, getAttendance };
