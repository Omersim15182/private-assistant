import React, { useEffect, useState } from "react";
import pic from "../../photos/istockphoto-1437816897-1024x1024.jpg";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./chat.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

export default function Members({ onSelectMember }) {
  const [users, setUsers] = useState([{ id: "", name: "", picture: pic }]);
  const [userDb, setUserDb] = useState([]);
  const [contactChat, setContactChat] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const showContactChat = (contcat) => {
    setContactChat((prevContact) => [...prevContact,contcat])
  };

  useEffect(() => {
    // Get request to retrieve contacts from db
    const fetchContact = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3500/chat/messages/retrieveContact",
          {
            withCredentials: true,
          }
        );
        console.log("response", response);
        const contact = response.data;
        setUserDb((prevUserDb) => [...prevUserDb, ...contact]);
        setUsers(
          response.data.map((contact) => ({ ...contact, picture: pic }))
        );
      } catch (error) {
        console.error("Error to fetch contact: ", error);
      }
    };

    const fetchUserLogin = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3500/home/userlogin",
          {
            withCredentials: true,
          }
        );
        const user = response.data;
        console.log("test", user);
      } catch (error) {
        console.error("login error", error);
      }
    };

    fetchContact();
    fetchUserLogin();
  }, []);

  console.log("my users", users);
  console.log("users db", userDb);
console.log('con',contactChat);
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
                {users.map((user, index) => (
                  <div key={index} onClick={() => showContactChat(user)}>
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="user-picture"
                    />
                    <div className="chat-details">
                      <h3>{user.name}</h3>
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
            {contactChat.map((contact,index) => (
              <div key={index}>
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
