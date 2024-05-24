import React, { useState } from 'react'
import pic from '../photos/istockphoto-1437816897-1024x1024.jpg'
import { v4 as uuidv4 } from 'uuid';
import { Card } from 'react-bootstrap';
import './chat.css'
export default function Members({ onSelectMember }) {

  const [users, setUsers] = useState([{ id: uuidv4(), name: 'John', message: 'Hello!', picture: pic },
  { id: uuidv4(), name: 'Alice', message: 'Hi there!', picture: pic },
  { id: uuidv4(), name: 'Omer', message: 'Hi there!', picture: pic }])

  const handleSelectMember = (user) =>{
    onSelectMember(user);
  }
 
  return (
    <div className='members'> 

      <Card className='members-card'>
        <Card.Body >
          <Card.Title>Chat</Card.Title>
          {users.map(user => (
            <div key={user.id} className='chat' onClick={()=>handleSelectMember(user)}>
              <img src={user.picture} alt='Profile' className='user-picture' />
              <div className='chat-details'>
                <h3>{user.name}</h3>
                <div >{user.message}</div>
              </div>
            </div>
          ))}
        </Card.Body>
      </Card>
    </div>

  );

}