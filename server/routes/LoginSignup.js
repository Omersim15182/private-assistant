const express = require("express");
const router = express.Router();
const pool = require("../dbConfig");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

dotenv.config();

router.use(express.urlencoded({ limit: "25mb", extended: true }));

// Function to generate JWT access token
function generateAccessToken(user) {
  return jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
}

// Login route
router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const query = "SELECT * FROM users WHERE name = $1";
    const result = await pool.query(query, [name]);

    const user = result.rows[0];

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const currentDate = new Date();

    await pool.query("INSERT INTO login (name, id, date) VALUES ($1, $2, $3)", [
      user.name,
      user.id,
      currentDate,
    ]);

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

// Signup route
router.post("/signup", async (req, res) => {
  const { email, name, password, photo } = req.body;
  const newId = uuidv4();

  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, name, password, photo, id) VALUES ($1, $2, $3, $4, $5)",
      [email, name, hashedPassword, photo, newId]
    );

    res.status(200).json({ message: "Sign Up success" });
  } catch (error) {
    console.error("Error during signup:", error);
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
