const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

// Test Route
router.get("/test", (req, res) => {
  res.json({
    message: "Auth Routes Working",
  });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;