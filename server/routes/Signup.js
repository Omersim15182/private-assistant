// src/routes/signup.js
const express = require("express");
const router = express.Router();
const { getRepository } = require("typeorm");
const bcrypt = require("bcrypt");
const User = require("../entity/User"); // Adjust the path as necessary

router.use(express.urlencoded({ limit: "25mb", extended: true }));

// Signup route
router.post("/signup", async (req, res) => {
  const { email, name, password, photo } = req.body;

  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get the user repository
    const userRepository = getRepository(User);

    // Create a new user instance
    const newUser = userRepository.create({
      email,
      name,
      password: hashedPassword,
      photo,
    });

    // Save the new user
    await userRepository.save(newUser);

    res.status(200).json({ message: "Sign Up success" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
