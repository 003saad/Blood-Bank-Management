// routes/authRoutes.js
const express = require("express");
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

// Route for user registration
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/info", verifyToken, getUserInfo);

module.exports = router;
