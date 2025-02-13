const Trainee = require("../models/Trainee");

// Add a new trainee
const addTrainee = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging Line

    const { traineeID, name, specialization } = req.body;
    
    if (!traineeID || !name || !specialization) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newTrainee = new Trainee({ traineeID, name, specialization });
    await newTrainee.save();

    res.status(201).json({ message: "Trainee added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error adding trainee" });
  }
};

// Get all trainees
const getTrainees = async (req, res) => {
  try {
    const trainees = await Trainee.find();
    res.status(200).json(trainees);
  } catch (error) {
    res.status(500).json({ error: "Error fetching trainees" });
  }
};

module.exports = { addTrainee, getTrainees };
