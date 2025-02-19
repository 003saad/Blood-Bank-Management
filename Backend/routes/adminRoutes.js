const express = require("express");
const { BloodCount } = require("../controllers/adminController");
const router = express.Router();

router.route("/bloodcount").get(BloodCount);

module.exports = router;
