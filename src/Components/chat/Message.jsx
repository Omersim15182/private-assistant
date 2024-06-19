import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3500'); 

export default function Message({ selectedMember }) {
  const [users, setUsers] = useState([{ messages: [{ name: '', message: '', date: '', id: '' }] }]);
  const [newMessageText, setNewMessageText] = useState('');
  const [contactMessages, setContactMessages] = useState([]);
  const [userAuthor, setUserAuthor] = useState('');
  const [socketMessage, setSocketMessage] = useState('');


  // Fetch messages and user login info
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/chat/${selectedMember.id}`, {
          withCredentials: true,
        });
        const messages = response.data
        const filteredMessages = messages.filter((u) => u.from_id === userAuthor.id || u.to_id === userAuthor.id);
        setContactMessages(filteredMessages);
        console.log('test fetchMessage');
        console.log('Fetched messages with contact:', messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    const fetchUserLogin = async () => {
      try {
        const response = await axios.get('http://localhost:3500/home/userlogin', {
          withCredentials: true,
        });
        setUserAuthor(response.data);
        console.log('Fetched user login:', response.data);
      } catch (error) {
        console.error('Error fetching user login:', error);
      }
    };

    if (selectedMember && selectedMember.id) {
      fetchMessages();
      fetchUserLogin();
    }
  }, [selectedMember,userAuthor.id]);

  // Listen for serverMsg events from the server
   useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on('serverMsg',(msg) => {
      console.log('Received message from server:', msg);
      setContactMessages((prevMessages) => [...prevMessages,msg]);
    });
    return () => {
      socket.off('serverMsg');
    };
   },[]);

  // Function to send a new message
  const sendMessage = () => {
    const updatedUsers = users.map(user => ({
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
    setContactMessages([...contactMessages, { message: newMessageText }]);
    setSocketMessage(newMessageText);
    setNewMessageText('');
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
      await axios.post('http://localhost:3500/chat/createMessage', updatedUser, {
        withCredentials: true,
      });
       // Emit clientMsg event to server via Socket.io
       console.log('new',socketMessage);
       socket.emit('clientMsg', socketMessage);

       // Update local state to reflect sent message
      setContactMessages((prevMessages) => [...prevMessages, { message: socketMessage }]);
      setNewMessageText('');

      console.log('Message sent successfully');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };
  console.log('admin', userAuthor);
 

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card style={{ height: '29rem', width: '35rem' }}>
          <Card.Body>
            <Card.Title>Messages</Card.Title>
            {contactMessages.map((contact, index) => (
              <p key={index}>{contact.message}</p>
            ))}
            <div className='friend-chat'>
              <p>Hey! I'm fine. Thanks for asking!</p>
            </div>
          </Card.Body>
          <div className='send-button'>
            <Button variant="success" type="submit" onClick={sendMessage}>
              Send
            </Button>
          </div>
          <FloatingLabel controlId="floatingTextarea2" label="Comments">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
              value={newMessageText}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Card>
      </form>
    </div>
  );
}
