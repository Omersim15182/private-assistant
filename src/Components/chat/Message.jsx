import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Button,
  TextField,
  Paper,
  CardContent,
  CardActions,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import io from "socket.io-client";
import "./chat.css";

// Initialize Socket.io connection
const socket = io("http://localhost:3500");

export default function Message({ selectedMember, userLogin }) {
  // State variables
  const [users, setUsers] = useState([
    { messages: [{ name: "", message: "", date: "", id: "" }] },
  ]);
  const [newMessageText, setNewMessageText] = useState(""); // New message text
  const [contactMessages, setContactMessages] = useState([]); // Messages with the selected contact
  const [userAuthor, setUserAuthor] = useState(""); // Logged-in user information
  const [socketMessage, setSocketMessage] = useState(""); // Message to be sent via Socket.io

  // Fetch messages and set user author
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3500/chat/${selectedMember.id}`,
          { withCredentials: true }
        );

        const messages = response.data;
        const filteredMessages = messages.filter(
          (u) => u.from_id === userAuthor.id || u.to_id === userAuthor.id
        );
        setContactMessages(filteredMessages); // Set filtered messages with the contact
        console.log("Fetched messages with contact:", messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    setUserAuthor(userLogin); // Set the logged-in user

    if (selectedMember && selectedMember.id) {
      fetchMessages(); // Fetch messages only if a member is selected
    }
  }, [selectedMember, userAuthor.id, userLogin]);

  // Listen for server messages via Socket.io
  useEffect(() => {
    if (!socket) return;

    socket.on("serverMsg", (msg) => {
      console.log("Received message from server:", msg);
      setContactMessages((prevMessages) => [...prevMessages, { message: msg }]);
    });

    return () => {
      socket.off("serverMsg"); // Clean up the event listener on unmount
    };
  }, []);

  // Function to send a new message
  const sendMessage = () => {
    const updatedUsers = users.map((user) => ({
      messages: [
        ...user.messages,
        {
          id: selectedMember.id,
          name: selectedMember.name,
          message: newMessageText,
          date: new Date(),
        },
      ],
    }));

    setUsers(updatedUsers);
    setSocketMessage(newMessageText);
    setNewMessageText(""); // Clear the message input
  };

  // Handle input change
  const handleChange = (event) => {
    setNewMessageText(event.target.value);
  };

  // Handle form submission for sending a message
  const handleSubmit = async (e) => {
    e.preventDefault();

    const lastUser = users[users.length - 1];
    const updatedUser = {
      messages: [
        {
          from: userAuthor.id,
          to: selectedMember.id,
          message: lastUser.messages[lastUser.messages.length - 1].message,
          date: lastUser.messages[lastUser.messages.length - 1].date,
        },
      ],
    };

    try {
      await axios.post(
        "http://localhost:3500/chat/createMessage",
        updatedUser,
        { withCredentials: true }
      );

      // Emit the message via Socket.io
      console.log("new", socketMessage);
      socket.emit("clientMsg", socketMessage);

      // Update local state
      setNewMessageText("");
      console.log("Message sent successfully");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  console.log("Selected Member:", selectedMember.id);
  console.log("Logged-in User:", userAuthor);

  return (
    <div>
      {/* Form for sending messages */}
      <form onSubmit={handleSubmit}>
        <Card className="message">
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h5">Messages</Typography>
            {/* Displaying messages */}
            <Paper
              sx={{ padding: 2, height: "calc(100% - 80px)", overflow: "auto" }}
            >
              {contactMessages.map((contact, index) => (
                <Typography
                  key={index}
                  paragraph
                  className={
                    contact.from_id === userAuthor.id
                      ? "message-from-me"
                      : "message-from-others"
                  }
                >
                  {contact.message}
                </Typography>
              ))}
            </Paper>
          </CardContent>
          <CardActions>
            {/* Input field for typing messages */}
            <TextField
              variant="outlined"
              multiline
              rows={4}
              placeholder="Leave a comment here"
              fullWidth
              value={newMessageText}
              onChange={handleChange}
              sx={{ marginBottom: 1 }}
            />
            {/* Button to send messages */}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              endIcon={<SendIcon />}
              onClick={sendMessage}
            >
              Send
            </Button>
          </CardActions>
        </Card>
      </form>
      <div>
        <video></video>
      </div>
    </div>
  );
}
