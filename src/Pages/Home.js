import React, { useState } from 'react'
import Login from '../Components/LoginSignup/Login'
import Signup from '../Components/LoginSignup/Signup'
import { Button } from 'react-bootstrap';

export default function Home() {
  const [displayLogin, setDisplayLogin] = useState(true);

  const showLogin = () => {
      setDisplayLogin(true);
  };
  const showSignup = () => {
      setDisplayLogin(false);
  };
  return (
    <div>
      <form>
      {displayLogin ? <Login/> : <Signup/>}
      <Button onClick={showLogin}>Login</Button>
      <Button onClick={showSignup}>Signup</Button>
      </form>
    </div>
  )
}
