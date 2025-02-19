const { getBloodCount } = require("../models/adminModel");

const BloodCount = async (req, res) => {
  try {
    const result = await getBloodCount();
    res.status(200).json({ message: "Request Successful", result });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message });
  }
};
const singlePersonBloodRequest = async (req, res) => {
  try {
    const { mobile } = req.user;

    const result = await getRequestByMobile(mobile);
    res.status(200).json({ message: "Request Successful", result });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message });
  }
};
const donateBlood = async (req, res) => {
  try {
    const { bloodAmount, disease } = req.body;
    const { mobile } = req.user;

    console.log("Blood: ", bloodAmount, "Disease: ", disease);
    console.log("Mobile: ", mobile);
    const result = await addBloodDonate(mobile, disease);
    res.status(200).json({ message: "Donate Successful" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message });
  }
};
const singlePersonBloodDonate = async (req, res) => {
  try {
    const { mobile } = req.user;

    const result = await getDonateByMobile(mobile);
    res.status(200).json({ message: "Donate Successful", result });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { BloodCount };
