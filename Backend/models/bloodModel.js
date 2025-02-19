// models/authModel.js
const db = require("../config/db");
const bcrypt = require("bcrypt");

// Function to create a user
const addBloodRequest = async (mobile, amount, disease) => {
  try {
    const [rows] = await db.execute(
      "INSERT INTO blood_request (mobile, amount, disease) VALUES (?, ?, ?);",
      [mobile, amount, disease]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};
const getRequestByMobile = async (mobile) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM `blood_request` WHERE mobile = ?",
      [mobile]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};
const addBloodDonate = async (mobile) => {
  try {
    const [rows] = await db.execute(
      "INSERT INTO blood_donate (mobile) VALUES (?);",
      [mobile]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};
const getDonateByMobile = async (mobile) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM `blood_donate` WHERE mobile = ?",
      [mobile]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addBloodRequest,
  getRequestByMobile,
  addBloodDonate,
  getDonateByMobile,
};
