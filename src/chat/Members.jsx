import React, { useEffect, useState } from 'react'
import pic from '../photos/istockphoto-1437816897-1024x1024.jpg'
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './chat.css'
import axios from 'axios';

export default function Members({ onSelectMember }) {

  const [users, setUsers] = useState([{ id:'', name: '', picture: pic }])
  const [inputName, setInputName] = useState('');
  const [userDb,setUserDb] = useState([]);

  const handleSelectMember = (user) => {
    onSelectMember(user);
  }

  const handleInputChange = (e) => {
    setInputName(e.target.value);
  };
  
  //Create new contact  
  const addContact = async() =>{
    if (inputName === '') {
      alert('Please enter a name');
      return;
    }
    try {
      const response = await axios.get('http://localhost:3500/chat/createContactId');
      const newUser = {id:response.data.id,name:inputName,picture:pic};
      setUsers([...users,newUser]);
      setInputName('');
    }
    catch(error){
      console.error('Error fetching ID:', error);
    }
  }

  //Get request to retrieve contacts from db
  const fetchContact =  async() =>{
    try {
    const response = await axios.get('http://localhost:3500/chat/messages/retrieveContact');
    console.log('response',response);
    const contact = response.data;
    setUserDb(...userDb,contact); 
    setUsers(response.data.map(contact =>({...contact,picture:pic})));
  } catch (erorr) {
    console.error('Error to fetch contact: ',erorr);
  }
  };

  useEffect(() => {
    fetchContact();
  }, []);
console.log('my users',users);
  
  return (
    <div className='members'>
      <Card className='members-card'>
        <Card.Body >
          <Card.Title>Chat</Card.Title>
          <input 
          placeholder='Add name'
          value={inputName}
          onChange={handleInputChange}   
          >
          </input>
          <Button onClick={addContact}>Add contact</Button>
          {users.map((user, index) => (
            <div key={ index} className='chat' onClick={() => handleSelectMember(user)}>
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