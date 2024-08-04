const express = require("express");
const router = express.Router();
const db = require("../dbConfig");
const { v4: uuidv4 } = require("uuid");
const checkAuth = require("../middlewares/checkAuth");

router.use(checkAuth);

//Get request to create key for each new contact
router.get("/createContactId", (req, res) => {
  const newId = { id: uuidv4() };
  res.json(newId);
});

//Post request to create a new message
router.post("/createMessage", async (req, res) => {
  try {
    const { messages } = req.body;

    const message = messages[0];

    console.log("message:", message);

    await db.query(
      "INSERT INTO messages (from_id, to_id,message, date) VALUES ($1, $2, $3,$4)",
      [message.from, message.to, message.message, message.date]
    );

    res.json({ message: "Message created seccessfully" });
  } catch (error) {
    console.error("Error creating message:", error);
    res.sendStatus(500); // statusCodes.INTERNAL_SERVER_ERROR
  }
});

//Get request to choose the contact's messages order the key
router.get("/:userId", async (req, res) => {
  // Add something before the :userId because it takes all the requests there.

  try {
    const userId = req.params.userId;

    console.log("userId:", req.params.userId);

    const data = await db.query(
      "SELECT * FROM messages WHERE to_id = $1 OR from_id = $1",
      [userId]
    );

    console.log("test for userId:", data.rows);

    res.json(data.rows);
  } catch (error) {
    console.error("Error in fetch messages oreder the key: ", error);
  }
});

//Get request to retrieve contacts from db
router.get("/messages/retrieveContact", async (req, res) => {
  try {
    const data = await db.query("SELECT DISTINCT id, name FROM users");

    console.log("Data retrieved from DB:", data.rows);

    res.json(data.rows);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "An internal server error occurred" }); // sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
});

module.exports = router;
