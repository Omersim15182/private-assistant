const express = require("express");
const router = express.Router();
const { getRepository } = require("typeorm");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../entity/User");
const Login = require("../entity/Login");
const dotenv = require("dotenv");

dotenv.config();

function generateAccessToken(user) {
  return jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
}

// Login route
router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const userRepository = getRepository(User);
    const loginRepository = getRepository(Login);

    const user = await userRepository.findOne({ where: { name } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const currentDate = new Date();
    await loginRepository.save({
      name: user.name,
      id: user.id,
      date: currentDate,
    });

    const token = generateAccessToken(user);

    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 3600000,
      httpOnly: true,
    });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get user info based on JWT token
router.get("/userlogin", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
    res.status(200).json(verifiedUser);
  } catch (e) {
    console.error("Error verifying token:", e);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

module.exports = router;
