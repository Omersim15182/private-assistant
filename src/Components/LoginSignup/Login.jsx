import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import './index.css'

export default function Login() {
    const [user,setUser] = useState([]);
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [text, setText] = useState('');

    const handleName = (e) =>{
      setName(e.target.value);
    }
    const handlePassword = (e) =>{
        setPassword(e.target.value);
      }
    const clickLogin = (e) =>{
        e.preventDefault();
     setUser([...user,{name:name,password:password}])
     setName('');
     setPassword('')
    }
    console.log(name);
    console.log(password);
    console.log(user);
    return (
        <div className='login'>
            <form>
                <h1>Login</h1>
                <p>Name</p>
                <input placeholder='Enter name' value={name} onChange={handleName}></input>
                <p>Password</p>
                <input placeholder='Enter password' value={password} onChange={handlePassword}></input>
                <Button onClick={clickLogin}>Submit</Button>
            </form>
        </div>

    )
}
