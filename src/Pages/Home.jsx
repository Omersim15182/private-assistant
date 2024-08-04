import React, { useState } from 'react';
import Login from '../Components/LoginSignup/Login';
import Signup from '../Components/LoginSignup/Signup';
import { Button } from 'react-bootstrap';
import '../Components/LoginSignup/index.css';

export default function Home() {
  const [displayLogin, setDisplayLogin] = useState(true);

  const showLogin = () => {
    setDisplayLogin(true);
  };

  const showSignup = () => {
    setDisplayLogin(false);
  };

  return (
    <div className='login'>
      <div className='login-board'>
        {displayLogin ? (
          <div>
            <Login />
            <Button onClick={showSignup}>Signup</Button>
          </div>
        ) : (
          <div>
          
            <Signup />
            <Button onClick={showLogin}>Login</Button>
          </div>
        )}
      </div>
    </div>
  );
}
