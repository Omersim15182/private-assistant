import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

export default function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleName = (e) => {
        setName(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
   

    //Post request
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('test');
        try {
            const response = await axios.post('http://localhost:3500/home/login', {
                name: name,
                password: password
            });
            const token = response.data.token;
            console.log('Login successful. Token:', token);
            setName('');
            setPassword('');
            history.push('../chat/Chat');


        } catch (error) {
            console.error('Failed to login. Please try again:', error.response);
        }
    }
    console.log(name);
    console.log(password);
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <p>Name</p>
                <input placeholder='Enter name' value={name} onChange={handleName}></input>
                <p>Password</p>
                <input placeholder='Enter password' value={password} onChange={handlePassword}></input>
                <Button type="submit" >Submit</Button>
            </form>
        </div>

    )
}
