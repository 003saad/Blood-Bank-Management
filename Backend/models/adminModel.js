// models/authModel.js
const db = require("../config/db");
const bcrypt = require("bcrypt");

// Function to create a user
const getBloodCount = async () => {
  try {
    const [rows] = await db.execute(
      "SELECT bg.blood_group, COUNT(u.blood_group) AS count FROM blood_group bg LEFT JOIN users u ON bg.blood_group = u.blood_group GROUP BY bg.blood_group"
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getBloodCount };
