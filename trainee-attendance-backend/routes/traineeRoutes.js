const express = require("express");
const { addTrainee, getTrainees } = require("../controllers/traineeController");
const router = express.Router();

router.post("/add", addTrainee);
router.get("/all", getTrainees);

module.exports = router;
