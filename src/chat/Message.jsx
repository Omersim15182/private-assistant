import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function Message({ selectedMember }) {
  const [users, setUsers] = useState([{  messages: [{name: '', message: '', date: '', id: '' }] }]);
  const [newMessageText, setNewMessageText] = useState('');

  //Function for send new message 
  const sentMessage = () => {
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
    setNewMessageText('');
  };

  //Function for save the message 
  const handleChange = event => {
    setNewMessageText(event.target.value);
  };

  //post request using axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    const lastUser = users[users.length - 1];
    const updatedUser = {

      messages: [
        {
          name: lastUser.messages[lastUser.messages.length - 1].name,
          message: lastUser.messages[lastUser.messages.length - 1].message,
          date: lastUser.messages[lastUser.messages.length - 1].date,
          id: lastUser.messages[lastUser.messages.length - 1].id,

        },
      ],
    };  console.log('lastUser',lastUser);

    {
      axios.post(`http://localhost:3500/createMessage`, updatedUser)

        .then(response => console.log(response))
        .catch(err => console.log(err))
    }
  }
  // Function to fetch messages for the selected member
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:3500/messages/${selectedMember.id}`);
      console.log('response',response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Fetch messages when selectedMember changes
  useEffect(() => {
    if (selectedMember && selectedMember.id) {
      fetchMessages();
    }
  }, [selectedMember]);

  console.log('users:', users);
  console.log('selectedMember:', selectedMember);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card style={{ height: '29rem', width: '35rem' }}>
          <Card.Body>
            <Card.Title>Messages</Card.Title>
            {users.map((user, userIndex) => (
              <div key={userIndex}>
                {user.messages.map((message, messageIndex) => (
                  <p key={messageIndex}>{message.message}</p>
                ))}
                <div className='friend-chat'>
                  <p>Hey! I'm fine. Thanks for asking!</p>
                </div>
              </div>
            ))}
          </Card.Body>
          <div className='send-button'>
            <Button variant="success" type="submit" onClick={sentMessage}>
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