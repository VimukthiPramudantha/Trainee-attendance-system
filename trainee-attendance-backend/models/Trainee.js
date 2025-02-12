const mongoose = require("mongoose");

const traineeSchema = new mongoose.Schema({
  traineeID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  specialization: { type: String, required: true },
});

module.exports = mongoose.model("Trainee", traineeSchema);
