import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import io from 'socket.io-client';

export default function Message({ selectedMember }) {
  const [users, setUsers] = useState([{ messages: [{ name: '', message: '', date: '', id: '' }] }]);
  const [newMessageText, setNewMessageText] = useState('');
  const [contactMessages, setContactMessages] = useState([]);
  const [userAuthor, setUserAuthor] = useState('');

  // Socket.io setup
  useEffect(() => {
    const socket = io.connect("http://localhost:3500");

    if (selectedMember && selectedMember.id) {
      socket.emit('join_room', selectedMember.id);
      console.log('Emitted join_room with:', selectedMember.id);
    }

    socket.on('receive_message', ({ from, message }) => {
      if (from === selectedMember.id) {
        setContactMessages(prevMessages => [...prevMessages, { message }]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedMember]);

  // Fetch messages and user login info
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/chat/${selectedMember.id}`, {
          withCredentials: true,
        });
        setContactMessages(response.data);
        console.log('Fetched messages with contact:', response.data);
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
  }, [selectedMember]);

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
    // Emit the message via socket
    const socket = io.connect("http://localhost:3500");
    socket.emit('send_message', {
      message:newMessageText , 
      id: selectedMember.id,
      idAuthor : userAuthor.id
    });

    setUsers(updatedUsers);
    setContactMessages([...contactMessages, { message: newMessageText }]);
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
    console.log('lastUser:', lastUser.messages[lastUser.messages.length - 1].id);
    try {
      await axios.post('http://localhost:3500/chat/createMessage', updatedUser, {
        withCredentials: true,
      });
      console.log('Message sent successfully');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };
  console.log('admin', userAuthor);
  console.log('touch', selectedMember.id);

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
