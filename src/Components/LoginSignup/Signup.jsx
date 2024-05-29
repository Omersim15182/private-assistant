import React, { useState } from 'react'
import { Button } from 'react-bootstrap';

export default function Signup() {
    const [user,setUser] = useState([]);
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [text, setText] = useState('');

    const handleEmail = (e) =>{
        setEmail(e.target.value)
    }
    const handleName = (e) =>{
      setName(e.target.value);
    }
    const handlePassword = (e) =>{
        setPassword(e.target.value);
      }
    const clickSignup = (e) =>{
        e.preventDefault();
    if (email === '' ||  name === '' || password === '') {
        alert('Enter again')
    } else {
        setUser([...user,{Email:email,Name:name,Password:password}])
        setEmail('');
        setName('');
        setPassword('')
    }
    }
    
    console.log('user sign up',user);
  return (
    
    <div>
            <form>
                <h1>Sign up</h1>
                <p>Email</p>
                <input placeholder='Enter email' value={email} onChange={handleEmail} ></input>
                <p>Name</p>
                <input placeholder='Enter name' value={name} onChange={handleName}></input>
                <p>Password</p>
                <input placeholder='Enter password' value={password} onChange={handlePassword}></input>
                <Button onClick={clickSignup}>Submit</Button>
            </form>
    </div>
  )
}
