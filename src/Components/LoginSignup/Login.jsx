import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';


export default function Login() {
    const [user, setUser] = useState([]);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [text, setText] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const clickLogin = (e) => {
        e.preventDefault();
        if (user === '' || password === '') {
            alert('Enter again')
        }
        else {
            setUser([...user, { name: name, password: password }])
            setName('');
            setPassword('')
        }
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
        } catch (error) {
            console.error('Failed to login. Please try again:', error.response);
        }
    }
    console.log(name);
    console.log(password);
    console.log(user);
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
