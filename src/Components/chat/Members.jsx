import React, { useEffect, useState } from "react";
import pic from "../../photos/istockphoto-1437816897-1024x1024.jpg";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./chat.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

export default function Members() {
  const [users, setUsers] = useState([]); //All the users in the db
  const [contactChat, setContactChat] = useState([]); //All the users that choose for chat
  const [admin, setAdmin] = useState({ id: "" }); //The user who login
  const [contacts, setContacts] = useState([]); //All the users that available for choose

  // Toggle modal visibility
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Add contact to the chat list && remove the contacts that choose for chat
  const chooseContactChat = (contcat) => {
    setContactChat((prevContact) => [...prevContact, contcat]);
    setContacts((prevContacts) =>
      prevContacts.filter((prevContact) => prevContact.id !== contcat.id)
    );
  };

  useEffect(() => {
    // Get request to retrieve contacts from db
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3500/chat/messages/retrieveContact",
          {
            withCredentials: true,
          }
        );
        console.log("response", response);
        setUsers(
          response.data.map((contact) => ({ ...contact, picture: pic }))
        );
      } catch (error) {
        console.error("Error to fetch contact: ", error);
      }

      //Get request to fetch the user that login
      try {
        const response = await axios.get(
          "http://localhost:3500/home/userlogin",
          {
            withCredentials: true,
          }
        );
        setAdmin({ id: response.data.id });
      } catch (error) {
        console.error("login error", error);
      }
    }
    fetchData();
  }, []);

  // Filter when there is a change in the admin
  useEffect(() => {
    if (!admin.id) return;

    // Filter out contacts that are already in contactChat
    const filteredContacts = users.filter((user) => {
      return (
        user.id !== admin.id && !contactChat.some((chat) => chat.id === user.id)
      );
    });

    setContacts(filteredContacts);
  }, [admin.id, users, contactChat]);

  useEffect(() => {
    async function getContactsChat() {
      //Post request to show to chat contacts from
      try {
        const response = await axios.post(
          "http://localhost:3500/Contacts/getChatContacts",
          {
            userAdminId: admin,
          },
          { withCredentials: true }
        );
        console.log("responses", response.data);
        console.log("aaaas", admin);
        setContactChat(
          response.data.map((contact) => ({ ...contact, contact }))
        );
      } catch (e) {
        console.error(e);
      }
    }
    getContactsChat();
  }, [admin]);

  //Add the contact from the chat list to the db
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
      console.error("Error to add contact to the list : ", e.response.data);
    }
  };

  // Debugging logs
  console.log("my users", users);
  console.log("contactChat", contactChat);
  console.log("admin", admin);
  console.log("tset", contacts);

  return (
    <div className="members">
      <Card className="members-card">
        <Card.Body>
          <Card.Title>Chat</Card.Title>
          <>
            <Button variant="primary" onClick={handleShow}>
              Choose contact
            </Button>
            <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>Contacts</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {contacts.map((user) => (
                  <div
                    style={{ cursor: "pointer", width: "max-content" }}
                    key={user.id}
                    onClick={(e) => {
                      handleSubmit(e, user);
                      chooseContactChat(user);
                    }}
                  >
                    <div>
                      <img
                        src={user.picture}
                        alt="Profile"
                        className="user-picture"
                      />
                      <div className="chat-details">
                        <h3>{user.name}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
          <div>
            {contactChat.map((contact) => (
              <div key={contact.id}>
                <img
                  src={contact.picture}
                  alt="Profile"
                  className="user-picture"
                />
                <div className="chat-details">
                  <h3>{contact.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
