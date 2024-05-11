import React, { useState } from 'react'
import pic from '../photos/istockphoto-1437816897-1024x1024.jpg'
import { v4 as uuidv4 } from 'uuid';
import { Card } from 'react-bootstrap';

export default function Members() {

  const [users, setUsers] = useState([{ id: uuidv4(), name: 'John', message: 'Hello!', picture: pic },
  { id: uuidv4(), name: 'Alice', message: 'Hi there!', picture: pic },
  { id: uuidv4(), name: 'Alice', message: 'Hi there!', picture: pic }])
  return (
    <div style={{
      width: '30%',
      justifyContent: 'space-evenly',
      position:'relative',
      left:'20px'
    }}>

      <Card style={{ height:'29rem',width: '20rem', background: '#f0f0f0' }}>
        <Card.Body >
          <Card.Title>Chat</Card.Title>
          {users.map(user => (
            <div key={user.id} className='chat'>
              <img src={user.picture} alt='Profile' className='user-picture' />
              <div className='chat-child'>
                <h3 style={{ position: 'relative', left: '10px' }}>{user.name}</h3>
                <div style={{ position: 'relative', left: '10px' }}>{user.message}</div>
              </div>
            </div>
          ))}
        </Card.Body>
      </Card>
    </div>

  );

}
