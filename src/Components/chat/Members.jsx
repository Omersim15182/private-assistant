import React, { useEffect, useState } from "react";
import pic from "../../photos/istockphoto-1437816897-1024x1024.jpg";
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
import "./chat.css";

export default function Members({ onSelectMember }) {
  const [users, setUsers] = useState([]);
  const [contactChat, setContactChat] = useState([]);
  const [admin, setAdmin] = useState({ id: "" });
  const [contacts, setContacts] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const chooseContactChat = (contact) => {
    setContactChat((prevContact) => [...prevContact, contact]);
    setContacts((prevContacts) =>
      prevContacts.filter((prevContact) => prevContact.id !== contact.id)
    );
  };

  const handleSelectMember = (user) => {
    onSelectMember(user);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3500/chat/messages/retrieveContact",
          { withCredentials: true }
        );
        setUsers(
          response.data.map((contact) => ({ ...contact, picture: pic }))
        );
      } catch (error) {
        console.error("Error fetching contacts: ", error);
      }

      try {
        const response = await axios.get(
          "http://localhost:3500/landingPage/userlogin",
          { withCredentials: true }
        );
        setAdmin({ id: response.data.id });
      } catch (error) {
        console.error("Login error", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!admin.id) return;

    const filteredContacts = users.filter((user) => {
      return (
        user.id !== admin.id && !contactChat.some((chat) => chat.id === user.id)
      );
    });

    setContacts(filteredContacts);
  }, [admin.id, users, contactChat]);

  useEffect(() => {
    async function getContactsChat() {
      try {
        const response = await axios.post(
          "http://localhost:3500/Contacts/getChatContacts",
          { userAdminId: admin },
          { withCredentials: true }
        );
        setContactChat(
          response.data.map((contact) => ({ ...contact, contact }))
        );
      } catch (e) {
        console.error(e);
      }
    }
    getContactsChat();
  }, [admin]);

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
                      src={user.picture}
                      alt="Profile"
                      className="user-picture"
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
                  src={contact.picture}
                  alt="Profile"
                  className="user-picture"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    marginRight: 16,
                  }}
                />
                <Typography variant="body1">{contact.name}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
