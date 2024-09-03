const express = require("express");
const router = express.Router();
const { getRepository } = require("typeorm");
const ChatContacts = require("../entity/ChatContacts");
const User = require("../entity/User");
const checkAuth = require("../middlewares/checkAuth");

router.use(checkAuth);

// Add the contact from the chat list to the db
router.post("/chatContacts", async (req, res) => {
  const { userAdmin, contact } = req.body;

  try {
    const chatContactsRepository = getRepository(ChatContacts);

    // Check if the contact already exists in the database
    const existingContact = await chatContactsRepository.findOne({
      where: { userAdmin: userAdmin.id, contactId: contact.id },
    });

    if (existingContact) {
      return res.status(409).json({ message: "Contact already exists" });
    }

    // If contact does not exist, insert it into the database
    const newContact = chatContactsRepository.create({
      userAdmin: userAdmin.id,
      contactId: contact.id,
      contactName: contact.name,
      contactPhoto: contact.photo,
    });

    await chatContactsRepository.save(newContact);

    res.status(200).json({ message: "Contact added successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to add contact" });
  }
});

// Get chat contacts
router.post("/getChatContacts", async (req, res) => {
  const { userAdminId } = req.body;

  try {
    const chatContactsRepository = getRepository(ChatContacts);

    // Query to fetch chat contacts where userAdmin matches
    const contacts = await chatContactsRepository.find({
      where: { userAdmin: userAdminId.id },
    });

    // Send the fetched data back in the response
    res.json(
      contacts.map((contact) => ({
        id: contact.contactId,
        photo: contact.contactPhoto,
        name: contact.contactName,
      }))
    );
  } catch (e) {
    console.error("Error fetching chat contacts:", e);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// Get request to retrieve contacts from db
router.get("/retrieveContacts", async (req, res) => {
  try {
    const userRepository = getRepository(User);
    const data = await userRepository
      .createQueryBuilder("users")
      .select(["id", "name", "photo"])
      .distinct(true)
      .getRawMany();

    res.json(data);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "An internal server error occurred" }); // sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
});

module.exports = router;
