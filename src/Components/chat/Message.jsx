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
import "../Chat/chat.css";
const socket = io("http://localhost:3500");

export default function Message({ selectedMember }) {
  const [users, setUsers] = useState([
    { messages: [{ name: "", message: "", date: "", id: "" }] },
  ]);

  const [newMessageText, setNewMessageText] = useState("");
  const [contactMessages, setContactMessages] = useState([]);
  const [userAuthor, setUserAuthor] = useState("");
  const [socketMessage, setSocketMessage] = useState("");

  // Fetch messages and user login info
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3500/chat/${selectedMember.id}`,
          {
            withCredentials: true,
          }
        );

        const messages = response.data;
        const filteredMessages = messages.filter(
          (u) => u.from_id === userAuthor.id || u.to_id === userAuthor.id
        );
        setContactMessages(filteredMessages);
        console.log("Fetched messages with contact:", messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
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

        setUserAuthor(response.data);
        console.log("Fetched user login:", response.data);
      } catch (error) {
        console.error("Error fetching user login:", error);
      }
    };

    if (selectedMember && selectedMember.id) {
      fetchMessages();
      fetchUserLogin();
    }
  }, [selectedMember, userAuthor.id, contactMessages]);

  // Listen for serverMsg events from the server
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("serverMsg", (msg) => {
      console.log("Received message from server:", msg);
      setContactMessages((prevMessages) => [...prevMessages, { message: msg }]);
    });
    return () => {
      socket.off("serverMsg");
    };
  }, [contactMessages]);

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
    setNewMessageText("");
  };

  // Function to handle input change
  const handleChange = (event) => {
    setNewMessageText(event.target.value);
  };

  // Function to handle form submission
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
        {
          withCredentials: true,
        }
      );

      // Emit clientMsg event to server via Socket.io
      console.log("new", socketMessage);
      socket.emit("clientMsg", socketMessage);

      // Update local state to reflect sent message
      setNewMessageText("");

      console.log("Message sent successfully");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  console.log("admin", userAuthor);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card className="message">
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h5">Messages</Typography>
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
            <TextField
              variant="outlined"
              multiline
              rows={4}
              placeholder="Leave a comment here"
              fullWidth
              value={newMessageText}
              onChange={handleChange}
              sx={{ marginBottom: 1 }}
            ></TextField>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              endIcon={<SendIcon />}
              onClick={sendMessage}
            >
              send
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
