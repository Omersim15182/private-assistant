import React, { useEffect, useState } from 'react';
import pic from '../../photos/istockphoto-1437816897-1024x1024.jpg';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './chat.css';
import axios from 'axios';

export default function Members({ onSelectMember }) {
  const [users, setUsers] = useState([{ id: '', name: '', picture: pic }]);
  const [inputName, setInputName] = useState('');
  const [userDb, setUserDb] = useState([]);
  const [userAuthor, setUserAuthor] = useState('');

  const handleSelectMember = (user) => {
    onSelectMember(user);
  };

  // Create new contact  
  const addContact = async () => {
    if (inputName === '') {
      alert('Please enter a name');
      return;
    }
    try {
      const response = await axios.get('http://localhost:3500/chat/createContactId', {
        withCredentials: true,
      });
      const newUser = { id: response.data.id, name: inputName, picture: pic };
      setUsers([...users, newUser]);
      setInputName('');
    } catch (error) {
      console.error('Error fetching contact:', error);
    }
  };

  useEffect(() => {
    // Get request to retrieve contacts from db
    const fetchContact = async () => {
      try {
        const response = await axios.get('http://localhost:3500/chat/messages/retrieveContact', {
          withCredentials: true,
        });
        console.log('response', response);
        const contact = response.data;
        setUserDb((prevUserDb) => [...prevUserDb, ...contact]);
        setUsers(response.data.map((contact) => ({ ...contact, picture: pic })));
      } catch (error) {
        console.error('Error to fetch contact: ', error);
      }
    };

    const fetchUserLogin = async () => {
      try {
        const response = await axios.get('http://localhost:3500/home/userlogin', {
          withCredentials: true,
        });
        const user = response.data;
        console.log('test',user);
        setUserAuthor(user.id);
      } catch (error) {
        console.error('login error', error);
      }
    };

    fetchContact();
    fetchUserLogin();
  }, []);

  console.log('loginAuthorMember', userAuthor);
  const filteredUsers = users.filter((u) => u.id !== userAuthor);
  console.log('my users', users);
  console.log('users db', userDb);

  return (
    <div className='members'>
      <Card className='members-card'>
        <Card.Body>
          <Card.Title>Chat</Card.Title>
          <Button onClick={addContact}>Show contacts </Button>
          {filteredUsers.map((user, index) => (
            <div key={index} className='chat' onClick={() => handleSelectMember(user)}>
              <img src={user.picture} alt='Profile' className='user-picture' />
              <div className='chat-details'>
                <h3>{user.name}</h3>
                <div>{user.message}</div>
              </div>
            </div>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}
