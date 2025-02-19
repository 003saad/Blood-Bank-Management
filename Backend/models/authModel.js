// models/authModel.js
const db = require("../config/db");
const bcrypt = require("bcrypt");

// Function to create a user
const createUser = async (name, bloodGroup, address, age, role, mobile) => {
  try {
    console.log(typeof role);

    const result = await db.execute(
      "INSERT INTO users (name, blood_group, address, age, role, mobile) VALUES (?, ?, ?, ?, ?, ?)",
      [name, bloodGroup, address, age, role, mobile]
    );
    console.log(result);

    console.log("Insert result:", result); // Log the result here
    // Return the new user's ID
    console.log(result);

    return "Success";
  } catch (err) {
    console.log(err);

    throw new Error("Error creating user: not added");
  }
};

// Function to create user credentials (mobile, password)
// Function to create user credentials (mobile, password)
const createUserCredentials = async (mobile, password) => {
  try {
    // Ensure password is not empty
    console.log(password);

    if (!password) {
      throw new Error("Password is required to create user credentials");
    }

    // Hash the password using bcrypt
    const saltRounds = 10; // Typical value for salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert credentials into the 'user_credentials' table
    await db.execute(
      "INSERT INTO user_credentials ( mobile, password) VALUES ( ?, ?)",
      [mobile, hashedPassword]
    );
  } catch (err) {
    throw new Error("Error creating user credentials: " + err.message);
  }
};

// Get user credentials
// models/authModel.js
const getUserDetails = async (mobile) => {
  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE mobile = ?", [
      mobile,
    ]);

    // Check if any row exists
    if (rows.length === 0) {
      throw new Error("User not found");
    }

    return rows[0]; // Return the first user match
  } catch (err) {
    throw new Error("Error fetching user details: " + err.message);
  }
};

const getUserCredentials = async (mobile) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM user_credentials WHERE mobile = ?",
      [mobile]
    );
    console.log(rows); // This will log the actual query result.

    return rows[0]; // Return the first match or undefined
  } catch (err) {
    throw new Error("Error fetching user credentials: " + err.message);
  }
};

module.exports = {
  createUser,
  createUserCredentials,
  getUserCredentials,
  getUserDetails,
};
