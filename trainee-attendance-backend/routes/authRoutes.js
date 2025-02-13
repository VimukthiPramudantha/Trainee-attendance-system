const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Define routes for authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
