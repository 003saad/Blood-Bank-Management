// index.js
require("dotenv").config();
const express = require("express");
const app = require("./app"); // Import app logic from app.js

const PORT = process.env.PORT || 3000; // Set the port

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
