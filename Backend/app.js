// app.js
const express = require("express");
const app = express();
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const bloodRoutes = require("./routes/bloodRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Middleware to parse JSON request body
app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/blood", bloodRoutes);
app.use("/admin", adminRoutes);

module.exports = app; // Export the app to use in index.js
