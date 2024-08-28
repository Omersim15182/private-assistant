const express = require("express");
const router = express.Router();
const pool = require("../dbConfig");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const bcrypt = require("bcrypt");
dotenv.config();

// Function to generate JWT access token
function generateAccessToken(user) {
  return jwt.sign(
    { id: user.id, password: user.password },
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" }
  );
}

router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const query = "SELECT * FROM users WHERE name = $1 AND password = $2";

    const result = await pool.query(query, [name, password]);

    const user = result.rows[0];

    const currentDate = new Date();

    await pool.query("INSERT INTO login (name,id,date) VALUES ($1,$2,$3)", [
      user.name,
      user.id,
      currentDate,
    ]);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" }); // sendStatus 401???
    }
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

const upload = multer({ dest: "../Photos/" });

router.post("/signup", upload.single("image"), async (req, res) => {
  const { email, name, password } = req.body;
  const photo = req.file ? req.file.filename : null;
  const newId = uuidv4();

  try {
    // Insert the new user into the database, including the photo filename
    await pool.query(
      "INSERT INTO users (email, name, password, photo, id) VALUES ($1, $2, $3, $4, $5)",
      [email, name, password, photo, newId]
    );

    res.status(200).json({ message: "Sign Up success" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/userlogin", async (req, res) => {
  const token = req.cookies.token;

  // There is no token.
  if (!token) {
    console.error("Error in the login");
    res.sendStatus(400);
    return;
  }

  let verifiedUser;

  try {
    verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);

    if (verifiedUser) {
      res.status(200).json(verifiedUser);
    }
  } catch (e) {
    console.error("Error in the login", e);
  }

  if (!verifiedUser) return; // There is no user with the matching token / secret.
  console.log("veri", verifiedUser);
});

module.exports = router;
