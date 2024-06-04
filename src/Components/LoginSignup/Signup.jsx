import axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';

export default function Signup() {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleName = (e) => {
    setName(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const clickSignup = (e) => {
    if (email === '' || name === '' || password === '') {
      alert('Enter again')
    } else {
      setUser([...user, { Email: email, Name: name, Password: password }])
      setEmail('');
      setName('');
      setPassword('')
    }
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    clickSignup()
    try{
      const response = await axios.post('http://localhost:3500/home/signup',{
        email : email,
        name : name ,
        password :password
      })
      console.log('Sign-up successful.:',user );
      console.log('response :',response);
    } catch(error) {
      console.error('Error sign up ',error);
    }
  }
  console.log('user sign up', user);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <p>Email</p>
        <input placeholder='Enter email' value={email} onChange={handleEmail} ></input>
        <p>Name</p>
        <input placeholder='Enter name' value={name} onChange={handleName}></input>
        <p>Password</p>
        <input placeholder='Enter password' value={password} onChange={handlePassword}></input>
        <Button type='submit' >Submit</Button>
      </form>
    </div>
  )
}
