// routes/authRoutes.js
const express = require("express");

const { verifyToken } = require("../middlewares/authMiddleware");
const {
  requestBlood,
  singlePersonBloodRequest,
  donateBlood,
  singlePersonBloodDonate,
} = require("../controllers/bloodController");
const router = express.Router();

// Route for user registration
router.post("/request", verifyToken, requestBlood);
router.get("/request", verifyToken, singlePersonBloodRequest);
router.post("/donate", verifyToken, donateBlood);
router.get("/donate", verifyToken, singlePersonBloodDonate);

module.exports = router;
