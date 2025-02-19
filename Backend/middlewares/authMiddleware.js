// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
    console.log(decoded);

    // Attach the user information to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware or controller
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyToken };
