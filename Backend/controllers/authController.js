// controllers/authController.js
const authModel = require("../models/authModel");
const { getUserCredentials, getUserDetails } = require("../models/authModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { name, bloodGroup, address, mobile, age, password, role } = req.body;

  try {
    // Create user in the 'users' table
    const userId = await authModel.createUser(
      name,
      bloodGroup,
      address,
      age,
      role,
      mobile
    );
    console.log(password);

    // Create user credentials in the 'user_credentials' table
    await authModel.createUserCredentials(mobile, password); // Using mobile instead of userId
    // console.log(req.body);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message });
  }
};

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET; // Use an environment variable in production

// User login
const loginUser = async (req, res) => {
  const { mobile, password } = req.body;

  try {
    // Fetch user credentials
    const user = await getUserCredentials(mobile);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.user_id, mobile: user.mobile },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    const userInfo = await getUserDetails(mobile);
    res.status(200).json({ token, message: "Login successful", userInfo });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getUserInfo = async (req, res) => {
  const { user } = req; // Access the user object from the request (populated by verifyToken)

  try {
    if (!user || !user.mobile) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch user info using the mobile from the decoded token
    const userInfo = await getUserDetails(user.mobile); // This should be a model function to fetch user info from DB

    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ userInfo, message: "User found" });
  } catch (err) {
    console.error("Error during find:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
};
