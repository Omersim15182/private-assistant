const express = require("express");
const router = express.Router();
const pool = require("../dbConfig");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

router.use(express.urlencoded({ limit: "25mb", extended: true }));

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

module.exports = router;
