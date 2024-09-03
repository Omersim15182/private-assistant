const express = require("express");
const router = express.Router();
const { getRepository } = require("typeorm");
const Message = require("../entity/Message");
const checkAuth = require("../middlewares/checkAuth");

router.use(checkAuth);

// Get request to create key for each new contact
router.get("/createContactId", (req, res) => {
  const newId = { id: uuidv4() };
  res.json(newId);
});

// Post request to create a new message
router.post("/createMessage", async (req, res) => {
  try {
    const { messages } = req.body;
    const message = messages[0];

    console.log("message:", message);

    const messageRepository = getRepository(Message);

    const newMessage = messageRepository.create({
      from_id: message.from,
      to_id: message.to,
      message: message.message,
      date: message.date,
    });

    await messageRepository.insert(newMessage);

    res.json({ message: "Message created successfully" });
  } catch (error) {
    console.error("Error creating message:", error);
    res.sendStatus(500); // statusCodes.INTERNAL_SERVER_ERROR
  }
});

// Get request to choose the contact's messages order the key
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    console.log("userId:", userId);

    const messageRepository = getRepository(Message);

    const data = await messageRepository.find({
      where: [{ to_id: userId }, { from_id: userId }],
    });

    console.log("test for userId:", data);

    res.json(data);
  } catch (error) {
    console.error("Error in fetch messages order the key:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
