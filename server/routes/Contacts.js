const express = require("express");
const router = express.Router();
const db = require("../dbConfig");
const checkAuth = require("../middlewares/checkAuth");

router.use(checkAuth);

//Add the contact from the chat list to the db
router.post("/chatContacts", async (req, res) => {
  const { userAdmin, contact } = req.body;

  try {
    // Check if the contact already exists in the database
    const { rows } = await db.query(
      'SELECT * FROM chat_contacts WHERE "userAdmin" = $1 AND "contactId" = $2',
      [userAdmin.id, contact.id]
    );

    if (rows.length > 0) {
      return res.status(409).json({ message: "Contact already exists" });
    }

    // If contact does not exist, insert it into the database
    await db.query(
      'INSERT INTO chat_contacts ("userAdmin", "contactId", "contactName" , "contactPicture") VALUES ($1, $2, $3 , $4)',
      [userAdmin.id, contact.id, contact.name, contact.picture]
    );

    res.status(200).json({ message: "Contact added successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to add contact" });
  }
});

router.post("/getChatContacts", async (req, res) => {
  const { userAdminId } = req.body;
  console.log("user", userAdminId);

  try {
    // Query to fetch chat contacts where userAdmin matches
    const data = await db.query(
      'SELECT * FROM chat_contacts WHERE "userAdmin" = $1',
      [userAdminId.id]
    );

    const contacts = data.rows.map((row) => ({
      id: row.contactId,
      picture: row.contactPicture,
      name: row.contactName,
    }));
    // Send the fetched data back in the response
    res.json(contacts);
    console.log("aaaaa", data.rows);
  } catch (e) {
    console.error("Error fetching chat contacts:", e);
  }
});

module.exports = router;
