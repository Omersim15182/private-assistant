const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const checkAuth = require("../middlewares/checkAuth");
dotenv.config();

router.get("/deleteCookie", (req, res) => {
  res.cookie("token", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });
  res.send("Logout completed successfully.");
});

module.exports = router;
