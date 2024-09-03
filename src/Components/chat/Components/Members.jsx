import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Modal,
  Box,
  Button,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import axios from "axios";
import "../chat.css";

export default function Members({
  selectedMember,
  onSelectMember,
  allUsers,
  userLogin,
}) {
  const [users, setUsers] = useState([]); // All users
  const [contactChat, setContactChat] = useState([]); // Contacts currently in chat
  const [admin, setAdmin] = useState({ id: "" }); // Admin (current user) information
  const [contacts, setContacts] = useState([]); // Contacts available to chat
  const [show, setShow] = useState(false); // Modal visibility state

  // Handles closing the modal
  const handleClose = () => setShow(false);

  // Handles opening the modal
  const handleShow = () => setShow(true);

  // Handles selecting a member (contact) for chat
  const handleSelectMember = (user) => {
    onSelectMember(user);
  };

  // Adds a selected contact to the chat and removes them from the available contacts list
  const chooseContactChat = (contact) => {
    setContactChat((prevContact) => [...prevContact, contact]);
    setContacts((prevContacts) =>
      prevContacts.filter((prevContact) => prevContact.id !== contact.id)
    );
  };

  // Effect to set initial users and admin info
  useEffect(() => {
    if (allUsers) {
      setUsers(allUsers.map((user) => ({ ...user })));
    }

    setAdmin(userLogin); // Sets the logged-in user as the admin
  }, [allUsers, userLogin]);

  // Effect to filter out contacts that are already in the chat
  useEffect(() => {
    if (!admin.id) return;

    const filteredContacts = users.filter(
      (user) =>
        user.id !== admin.id && !contactChat.some((chat) => chat.id === user.id)
    );

    setContacts(filteredContacts); // Sets the available contacts
  }, [admin.id, users, contactChat]);

  // Effect to fetch chat contacts from the server

  useEffect(() => {
    if (!admin || !admin.id || admin.id === "") {
      return;
    } else {
    }

    async function getContactsChat() {
      try {
        const response = await axios.post(
          "http://localhost:3500/Contacts/getChatContacts",
          { userAdminId: admin },
          { withCredentials: true }
        );

        setContactChat(
          response.data.map((contact) => ({
            ...contact,
            contact,
          }))
        );
      } catch (e) {
        console.error(e); // Logs any errors
      }
    }
    getContactsChat();
  }, [admin]);

  // Handles adding a new contact to the chat
  const handleSubmit = async (e, user) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3500/Contacts/chatContacts",
        {
          userAdmin: admin,
          contact: user,
        },
        { withCredentials: true }
      );
    } catch (e) {
      console.error("Error adding contact to the list: ", e.response.data);
    }
  };

  // debug - logs users to the console
  console.log("///////////////");
  console.log("contactschat", contactChat);
  console.log("contacts", contacts);
  console.log("users", users);
  console.log("///////////////");

  return (
    <div className="members">
      <Card className="members-card">
        <CardHeader title="Chat" />
        <CardContent>
          <Button variant="contained" color="primary" onClick={handleShow}>
            Choose contact
          </Button>
          <Modal open={show} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                borderRadius: 1,
                boxShadow: 24,
                p: 4,
              }}
            >
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" component="h2">
                Contacts
              </Typography>
              <Box mt={2}>
                {/* List of available contacts */}
                {contacts.map((user) => (
                  <Box
                    key={user.id}
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                    onClick={(e) => {
                      handleSubmit(e, user);
                      chooseContactChat(user);
                    }}
                  >
                    <img
                      src={user.photo}
                      alt="Profile"
                      className="user-photo"
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        marginRight: 16,
                      }}
                    />
                    <Typography variant="body1">{user.name}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Modal>
          <Box mt={2}>
            {contactChat.map((contact) => (
              <Box
                key={contact.id}
                sx={{
                  border: "2px solid rgb(83, 42, 197)",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  mb: 2,
                }}
                onClick={() => handleSelectMember(contact)}
              >
                <img
                  src={contact.photo}
                  alt="Profile"
                  className="user-photo"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    marginRight: 16,
                    marginLeft: 10,
                  }}
                />
                <Typography style={{ marginRight: 50 }} variant="body1">
                  {contact.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
