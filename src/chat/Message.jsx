import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';

export default function Message() {
  const [users, setUsers] = useState([{ id: uuidv4(), name: '', messages: [] }]);
  const [newMessageText, setNewMessageText] = useState('');

  const sentMessage = () => {
    const updatedUsers = users.map(user => {
      const updatedMessages = [...user.messages, newMessageText];
      return { ...user, messages: updatedMessages };
    });
    setUsers(updatedUsers);
    setNewMessageText('');
  };

  const handleChange = event => {
    setNewMessageText(event.target.value);
  };
  return (
    <div>
      <div>
        <Card style={{ height: '29rem', width: '35rem' }}>
          <Card.Body>
            <Card.Title>Messages</Card.Title>
            {users.map(user => (
              <div key={user.id}>
                {user.messages.map((message, index) => (
                  <p key={index}>{message}</p>
                ))}
                <div className='friend-chat'>
                  <p>Hey! I'm fine. Thanks for asking!</p>
                </div>
              </div>
            ))}
          </Card.Body>
          <div className='send-button'>
            <Button variant="success"
              onClick={sentMessage}>
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
      </div>
    </div>
  );
}
